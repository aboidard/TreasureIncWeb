import React, { useCallback, useEffect, useRef, useState } from 'react'
import { adminFetch, formatDate, formatValue } from '@/utils/adminApi'
import { Button, ConfirmDialog, ErrorBanner, Panel, Spinner, SuccessBanner } from './ui'

const REFRESH_INTERVAL_S = 15

// Known KPIs of Maestro GET /admin/status
const KPIS = [
    { key: 'connectedUsers', label: 'Joueurs connectés' },
    { key: 'desyncedUsers', label: 'Joueurs désynchronisés', warnAbove: 0 },
    { key: 'redisMemoryMb', label: 'Mémoire Redis', unit: 'Mo', decimals: 1 },
    { key: 'requestsPerMinute', label: 'Requêtes / minute', decimals: 1 },
]

function KpiCard({ label, value, unit, decimals, warn }) {
    return (
        <div className={`bg-gray-900 rounded-xl p-5 shadow-2xl ring-4 ${warn ? 'ring-red-700' : 'ring-black'}`}>
            <div className="text-gray-400 text-sm mb-2">{label}</div>
            <div className={`font-kenvector text-3xl ${warn ? 'text-red-400' : 'text-white'}`}>
                {formatValue(value, { decimals })}
                {unit && value !== null && value !== undefined && <span className="text-base text-gray-400 ml-2">{unit}</span>}
            </div>
        </div>
    )
}

/** Renders the "extra" metrics generically: their keys are not known in advance. */
function ExtraMetrics({ extra }) {
    const entries = extra && typeof extra === 'object' ? Object.entries(extra) : []
    if (entries.length === 0) {
        return <p className="text-gray-400 text-sm">Aucune métrique supplémentaire.</p>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {entries.map(([key, metric]) => {
                // Tolerate a bare value instead of { label, value, unit }
                const isObject = metric !== null && typeof metric === 'object' && !Array.isArray(metric)
                const label = (isObject && metric.label) || key
                const value = isObject ? metric.value : metric
                const unit = isObject ? metric.unit : undefined
                return (
                    <div key={key} className="bg-gray-900 rounded-md px-4 py-3 flex justify-between items-baseline gap-4" title={key}>
                        <span className="text-gray-400 text-sm">{label}</span>
                        <span className="text-white text-lg whitespace-nowrap">{formatValue(value, { unit })}</span>
                    </div>
                )
            })}
        </div>
    )
}

function HealthBadge({ health, error }) {
    let color = 'bg-gray-600'
    let text = 'Santé : …'
    if (error) {
        color = 'bg-red-700'
        text = 'Maestro : injoignable'
    } else if (health) {
        const up = health.status === 'UP'
        color = up ? 'bg-green-700' : 'bg-red-700'
        const version = health.checks && health.checks.map(c => c.data && c.data.version).find(Boolean)
        text = `Maestro : ${health.status || '?'}${version ? ` · v${version}` : ''}`
    }
    return <span title={error ? error.message : undefined} className={`${color} text-white text-xs rounded-full px-3 py-1`}>{text}</span>
}

function SyncPanel({ onSynced }) {
    const [confirming, setConfirming] = useState(false)
    const [running, setRunning] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const runSync = async () => {
        setConfirming(false)
        setRunning(true)
        setError(null)
        setResult(null)
        try {
            setResult(await adminFetch('/sync', { method: 'POST' }))
            onSynced && onSynced()
        } catch (e) {
            setError(e)
        } finally {
            setRunning(false)
        }
    }

    return (
        <Panel title="Synchronisation">
            <ErrorBanner error={error} />
            {result &&
                <SuccessBanner>
                    Synchronisation terminée : {formatValue(result.syncedUsers)} joueur(s) synchronisé(s),{' '}
                    {formatValue(result.errors)} erreur(s), en {formatValue(result.durationMs, { unit: 'ms' })}{' '}
                    (démarrée le {formatDate(result.startedAt)}).
                </SuccessBanner>
            }
            <Button variant="danger" disabled={running} onClick={() => setConfirming(true)}>
                {running ? <><Spinner className="mr-2" />Synchronisation…</> : 'Forcer la synchronisation Redis → Postgres'}
            </Button>
            <ConfirmDialog open={confirming} danger title="Forcer la synchronisation ?"
                confirmLabel="Synchroniser" onConfirm={runSync} onCancel={() => setConfirming(false)}>
                Toutes les données joueurs présentes dans Redis vont être écrites dans Postgres.
            </ConfirmDialog>
        </Panel>
    )
}

export default function Dashboard() {
    const [status, setStatus] = useState(null)
    const [error, setError] = useState(null)
    const [health, setHealth] = useState(null)
    const [healthError, setHealthError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [paused, setPaused] = useState(false)
    const [lastFetch, setLastFetch] = useState(null)
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_S)
    const inFlight = useRef(false)

    const refresh = useCallback(async () => {
        if (inFlight.current) return
        inFlight.current = true
        setLoading(true)
        const [statusResult, healthResult] = await Promise.allSettled([
            adminFetch('/status'),
            adminFetch('/health', { acceptStatuses: [503] }),
        ])
        if (statusResult.status === 'fulfilled') {
            setStatus(statusResult.value)
            setError(null)
        } else {
            setError(statusResult.reason)
        }
        if (healthResult.status === 'fulfilled') {
            setHealth(healthResult.value)
            setHealthError(null)
        } else {
            setHealthError(healthResult.reason)
        }
        setLastFetch(new Date())
        setCountdown(REFRESH_INTERVAL_S)
        setLoading(false)
        inFlight.current = false
    }, [])

    useEffect(() => { refresh() }, [refresh])

    // Auto refresh: tick every second, reload when the countdown reaches zero.
    useEffect(() => {
        if (paused) return
        const timer = setInterval(() => setCountdown(c => c - 1), 1000)
        return () => clearInterval(timer)
    }, [paused])

    useEffect(() => {
        if (!paused && countdown <= 0) refresh()
    }, [countdown, paused, refresh])

    return (
        <>
            <Panel title="Tableau de bord"
                actions={<>
                    <HealthBadge health={health} error={healthError} />
                    <Button variant="ghost" onClick={() => setPaused(p => !p)}>
                        {paused ? '▶ Reprendre' : '❚❚ Pause'}
                    </Button>
                    <Button variant="ghost" onClick={refresh} disabled={loading}>
                        {loading ? <Spinner /> : '↻ Rafraîchir'}
                    </Button>
                </>}>
                <div className="text-gray-400 text-xs mb-4">
                    Données générées le {formatDate(status && status.generatedAt)}
                    {' · '}dernier appel {lastFetch ? lastFetch.toLocaleTimeString('fr-FR') : '—'}
                    {' · '}{paused ? 'rafraîchissement en pause' : `prochain rafraîchissement dans ${Math.max(countdown, 0)} s`}
                </div>
                <ErrorBanner error={error} onRetry={refresh} />
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ${error ? 'opacity-50' : ''}`}>
                    {KPIS.map(kpi => {
                        const value = status ? status[kpi.key] : null
                        const warn = kpi.warnAbove !== undefined && typeof value === 'number' && value > kpi.warnAbove
                        return <KpiCard key={kpi.key} label={kpi.label} value={value} unit={kpi.unit} decimals={kpi.decimals} warn={warn} />
                    })}
                </div>
                <h3 className="font-kenvector text-gray-200 mb-3">Autres métriques</h3>
                <div className={error ? 'opacity-50' : ''}>
                    <ExtraMetrics extra={status && status.extra} />
                </div>
            </Panel>
            <SyncPanel onSynced={refresh} />
        </>
    )
}

import React, { useState } from 'react'
import { adminFetch, formatDate, formatValue } from '@/utils/adminApi'
import { Button, ConfirmDialog, ErrorBanner, Panel, Spinner, SuccessBanner, inputClassName } from './ui'

const MAX_MONEY = 2147483647

/**
 * Player sheet (Maestro GET /users/{publicKey}) and edition (PUT /users/{publicKey}).
 * Maestro only lets the "money" field be updated.
 */
function EditUser({ user: initialUser, created, onBack }) {
    const [user, setUser] = useState(initialUser)
    const [money, setMoney] = useState(String(initialUser.money ?? ''))
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(created ? 'Joueur créé.' : null)
    const [busy, setBusy] = useState(false)
    const [confirming, setConfirming] = useState(false)

    const parsedMoney = /^\d+$/.test(money.trim()) ? Number(money.trim()) : NaN
    const moneyValid = Number.isInteger(parsedMoney) && parsedMoney <= MAX_MONEY
    const changed = moneyValid && parsedMoney !== user.money

    const path = `/users/${encodeURIComponent(user.publicKey)}`

    const reload = async () => {
        setBusy(true)
        setError(null)
        setMessage(null)
        try {
            const fresh = await adminFetch(path)
            setUser(fresh)
            setMoney(String(fresh.money ?? ''))
        } catch (e) {
            setError(e)
        } finally {
            setBusy(false)
        }
    }

    const save = async () => {
        setConfirming(false)
        setBusy(true)
        setError(null)
        setMessage(null)
        try {
            const updated = await adminFetch(path, { method: 'PUT', body: { money: parsedMoney } })
            if (updated) {
                setUser(updated)
                setMoney(String(updated.money ?? ''))
            }
            setMessage('Solde mis à jour.')
        } catch (e) {
            setError(e)
        } finally {
            setBusy(false)
        }
    }

    const rows = [
        ['id', formatValue(user.id)],
        ['publicKey', formatValue(user.publicKey)],
        ['money', formatValue(user.money)],
        ['créé le', formatDate(user.createdAt)],
        ['modifié le', formatDate(user.updatedAt)],
        ['dernière connexion', formatDate(user.lastLogin)],
    ]

    return (
        <Panel title={`Joueur ${user.publicKey}`}
            actions={<>
                <Button variant="ghost" onClick={reload} disabled={busy}>{busy ? <Spinner /> : '↻ Recharger'}</Button>
                <Button variant="ghost" onClick={onBack}>← Retour à la liste</Button>
            </>}>
            <ErrorBanner error={error} />
            <SuccessBanner>{message}</SuccessBanner>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 mb-6 text-sm">
                {rows.map(([label, value]) => (
                    <div key={label} className="bg-gray-900 rounded-md px-4 py-2">
                        <dt className="text-gray-400">{label}</dt>
                        <dd className="text-white font-mono break-all">{value}</dd>
                    </div>
                ))}
            </dl>
            <form className="flex flex-wrap items-end gap-3" onSubmit={e => { e.preventDefault(); if (changed) setConfirming(true) }}>
                <label className="flex flex-col text-sm text-gray-300">
                    Nouveau solde (money)
                    <input type="number" min="0" max={MAX_MONEY} step="1" value={money}
                        onChange={e => setMoney(e.target.value)} className={`${inputClassName} w-56 mt-1`} />
                </label>
                <Button type="submit" disabled={busy || !changed}>Enregistrer</Button>
                {!moneyValid && money !== '' && <span className="text-red-400 text-sm">Entier entre 0 et {MAX_MONEY} attendu.</span>}
            </form>
            <ConfirmDialog open={confirming} title="Modifier le solde ?" confirmLabel="Enregistrer"
                onConfirm={save} onCancel={() => setConfirming(false)}>
                Le solde du joueur {user.publicKey} va passer de {formatValue(user.money)} à {formatValue(parsedMoney)}.
            </ConfirmDialog>
        </Panel>
    )
}

export default EditUser

import React, { useState } from 'react'
import { adminFetch } from '@/utils/adminApi'
import { Button, ConfirmDialog, ErrorBanner, Panel, Spinner, SuccessBanner } from './ui'

/**
 * Weekly report (Maestro GET /reporting/sendWeeklyReport): builds the report
 * and emails it to the admin address configured in Maestro.
 */
export default function Reporting() {
    const [confirming, setConfirming] = useState(false)
    const [sending, setSending] = useState(false)
    const [report, setReport] = useState(null)
    const [error, setError] = useState(null)

    const send = async () => {
        setConfirming(false)
        setSending(true)
        setError(null)
        setReport(null)
        try {
            const text = await adminFetch('/reporting/weekly-report', { method: 'POST' })
            setReport(typeof text === 'string' ? text : JSON.stringify(text, null, 2))
        } catch (e) {
            setError(e)
        } finally {
            setSending(false)
        }
    }

    return (
        <Panel title="Rapport hebdomadaire">
            <p className="text-gray-300 text-sm mb-4">
                Envoyé automatiquement chaque lundi à minuit. Ce bouton le génère et l&apos;envoie immédiatement par e-mail
                à l&apos;adresse admin configurée dans Maestro.
            </p>
            <ErrorBanner error={error} />
            {report !== null && <>
                <SuccessBanner>Rapport généré, envoi de l&apos;e-mail demandé.</SuccessBanner>
                <pre className="bg-gray-900 rounded-md p-4 text-sm text-gray-200 whitespace-pre-wrap mb-4">{report}</pre>
            </>}
            <Button disabled={sending} onClick={() => setConfirming(true)}>
                {sending ? <><Spinner className="mr-2" />Envoi…</> : 'Envoyer le rapport maintenant'}
            </Button>
            <ConfirmDialog open={confirming} title="Envoyer le rapport ?" confirmLabel="Envoyer"
                onConfirm={send} onCancel={() => setConfirming(false)}>
                Un e-mail contenant le rapport de la semaine va être envoyé à l&apos;adresse admin.
            </ConfirmDialog>
        </Panel>
    )
}

/**
 * Browser-side client for the admin API routes (/api/admin/*).
 * The browser never talks to Maestro directly: the Next server proxies every call.
 */

export class AdminApiError extends Error {
    constructor(status, code, message) {
        super(message)
        this.status = status
        this.code = code
    }
}

const NETWORK_ERROR_MESSAGE = 'Le serveur web est injoignable. Vérifiez votre connexion.'

function messageFor(status, payload) {
    if (payload && payload.message) return payload.message
    if (status === 401) return 'Authentification admin expirée : rechargez la page.'
    if (status === 404) return 'Introuvable.'
    if (status >= 500) return `Erreur serveur (${status}).`
    return `Erreur inattendue (${status}).`
}

/**
 * Calls an admin API route. Resolves with the parsed JSON (or text) body,
 * rejects with an AdminApiError carrying a displayable French message.
 */
export async function adminFetch(path, { method = 'GET', body, acceptStatuses = [] } = {}) {
    let response
    try {
        response = await fetch(`/api/admin${path}`, {
            method,
            credentials: 'same-origin',
            cache: 'no-store',
            headers: {
                Accept: 'application/json, text/plain',
                // CSRF guard checked by the API routes on mutating requests
                'X-Treasure-Admin': '1',
                ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        })
    } catch {
        throw new AdminApiError(0, 'network', NETWORK_ERROR_MESSAGE)
    }

    if (response.status === 204) return null
    const contentType = response.headers.get('content-type') || ''
    let payload = null
    try {
        payload = contentType.includes('application/json') ? await response.json() : await response.text()
    } catch {
        payload = null
    }

    if (response.ok || acceptStatuses.includes(response.status)) return payload
    throw new AdminApiError(response.status, payload && payload.error, messageFor(response.status, payload))
}

export const EMPTY = '—'

/** Formats a value for display; null / undefined / NaN become "—". */
export function formatValue(value, { unit, decimals } = {}) {
    if (value === null || value === undefined || (typeof value === 'number' && Number.isNaN(value))) return EMPTY
    let text
    if (typeof value === 'number') {
        text = value.toLocaleString('fr-FR', decimals !== undefined
            ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
            : { maximumFractionDigits: 2 })
    } else if (typeof value === 'boolean') {
        text = value ? 'oui' : 'non'
    } else if (typeof value === 'object') {
        text = JSON.stringify(value)
    } else {
        text = String(value)
    }
    return unit ? `${text} ${unit}` : text
}

/** Formats an ISO-8601 string or an epoch in milliseconds; null becomes "—". */
export function formatDate(value) {
    if (value === null || value === undefined || value === '') return EMPTY
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return String(value)
    return date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'medium' })
}

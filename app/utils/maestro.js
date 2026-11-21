/**
 * Server-side client for Maestro, the Treasure Inc administration service.
 *
 * SERVER ONLY: import this module from API routes (pages/api/**) exclusively.
 * MAESTRO_URL and MAESTRO_API_KEY must never reach the browser.
 */
import { AUTH_OK, checkAdminAuth } from '@/utils/adminAuth'

// Docker compose service name / Kubernetes service name of Maestro.
export const DEFAULT_MAESTRO_URL = 'http://treasure-inc-maestro:8082'
const DEFAULT_TIMEOUT_MS = 10000

// Header required on mutating admin requests: a cross-site page cannot send it
// without a CORS preflight, which this server never answers (CSRF protection,
// since the browser automatically resends Basic credentials).
export const ADMIN_CSRF_HEADER = 'x-treasure-admin'

function maestroBaseUrl() {
    return (process.env.MAESTRO_URL || DEFAULT_MAESTRO_URL).replace(/\/+$/, '')
}

function configuredTimeoutMs() {
    const value = parseInt(process.env.MAESTRO_TIMEOUT_MS, 10)
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_TIMEOUT_MS
}

function sendError(res, status, error, message, extra = {}) {
    res.status(status).json({ error, message, ...extra })
}

/**
 * Calls Maestro and forwards its answer to the API route response.
 * Maestro errors are translated into JSON errors the admin UI can display.
 * A Maestro 401 is never forwarded as a 401: the browser would treat it as a
 * failure of the admin Basic credentials.
 * extraOkStatuses: Maestro statuses forwarded as-is (e.g. 503 for a DOWN health check).
 * minTimeoutMs: lower bound of the timeout for slow endpoints (e.g. the forced sync).
 */
export async function proxyToMaestro(res, { method = 'GET', path, body, extraOkStatuses = [], minTimeoutMs = 0 }) {
    res.setHeader('Cache-Control', 'no-store')

    const apiKey = process.env.MAESTRO_API_KEY
    if (!apiKey) {
        return sendError(res, 500, 'maestro_not_configured',
            "MAESTRO_API_KEY n'est pas configurée sur le serveur web.")
    }

    const url = maestroBaseUrl() + path
    const controller = new AbortController()
    const timeoutMs = Math.max(configuredTimeoutMs(), minTimeoutMs)
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    let response
    try {
        response = await fetch(url, {
            method,
            headers: {
                'X-API-KEY': apiKey,
                Accept: 'application/json, text/plain',
                ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller.signal,
            cache: 'no-store',
        })
    } catch (e) {
        const timedOut = e && e.name === 'AbortError'
        console.error(`[admin] Maestro ${method} ${path} failed:`, timedOut ? 'timeout' : (e && e.cause) || e)
        return timedOut
            ? sendError(res, 504, 'maestro_timeout', `Maestro n'a pas répondu dans les ${timeoutMs / 1000} s.`)
            : sendError(res, 502, 'maestro_unreachable', 'Maestro est injoignable.')
    } finally {
        clearTimeout(timer)
    }

    const contentType = response.headers.get('content-type') || ''
    const text = await response.text()
    let data = text
    if (contentType.includes('application/json') && text) {
        try {
            data = JSON.parse(text)
        } catch {
            // keep raw text
        }
    }

    if (response.ok || extraOkStatuses.includes(response.status)) {
        if (response.status === 204 || text === '') return res.status(204).end()
        if (typeof data === 'string') {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            return res.status(response.status).send(data)
        }
        return res.status(response.status).json(data)
    }

    console.error(`[admin] Maestro ${method} ${path} answered ${response.status}`)
    if (response.status === 401 || response.status === 403) {
        return sendError(res, 502, 'maestro_unauthorized',
            'Maestro a refusé la clé d\'API (MAESTRO_API_KEY invalide ?).', { maestroStatus: response.status })
    }
    if (response.status === 404) {
        return sendError(res, 404, 'not_found', 'Ressource introuvable dans Maestro.', { maestroStatus: 404 })
    }
    if (response.status === 405) {
        return sendError(res, 502, 'maestro_unsupported',
            "Cette version de Maestro ne propose pas cet endpoint.", { maestroStatus: 405 })
    }
    if (response.status >= 500) {
        // Maestro explains some failures in { "message" } (e.g. 504 engine timeout, 502 engine failure on /admin/sync)
        const detail = data && typeof data === 'object' && typeof data.message === 'string' ? ` : ${data.message}` : '.'
        return sendError(res, 502, 'maestro_error', `Maestro a renvoyé une erreur ${response.status}${detail}`,
            { maestroStatus: response.status })
    }
    return sendError(res, response.status, 'maestro_rejected', `Maestro a refusé la requête (${response.status}).`,
        { maestroStatus: response.status })
}

/**
 * Wraps an admin API route handler:
 *  - re-checks the Basic credentials (defense in depth, the middleware already did),
 *  - restricts the HTTP methods,
 *  - requires the CSRF header on mutating methods.
 */
export function adminHandler(methods, handler) {
    return async function (req, res) {
        const auth = await checkAdminAuth(req.headers.authorization)
        if (auth !== AUTH_OK) {
            return sendError(res, 401, 'unauthorized', 'Authentification requise.')
        }
        if (!methods.includes(req.method)) {
            res.setHeader('Allow', methods.join(', '))
            return sendError(res, 405, 'method_not_allowed', `Méthode ${req.method} non autorisée.`)
        }
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.headers[ADMIN_CSRF_HEADER] !== '1') {
            return sendError(res, 403, 'csrf', 'En-tête de sécurité manquant.')
        }
        return handler(req, res)
    }
}

const PUBLIC_KEY_PATTERN = /^[A-Za-z0-9_-]{1,64}$/

export function isValidPublicKey(publicKey) {
    return typeof publicKey === 'string' && PUBLIC_KEY_PATTERN.test(publicKey)
}

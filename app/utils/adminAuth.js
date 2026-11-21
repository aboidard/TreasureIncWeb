/**
 * Basic Authentication helpers for the admin area.
 *
 * Works in both the Edge runtime (middleware) and the Node runtime (API routes):
 * it only relies on the Web Crypto API (globalThis.crypto.subtle) and atob.
 *
 * Credentials come exclusively from ADMIN_USER / ADMIN_PASSWORD. When either is
 * missing or empty, every request is refused (fail closed).
 */

export const ADMIN_REALM = 'Treasure Inc Admin'

export const AUTH_OK = 'ok'
export const AUTH_MISSING = 'missing'
export const AUTH_INVALID = 'invalid'
export const AUTH_NOT_CONFIGURED = 'not_configured'

/**
 * Returns the configured admin credentials, or null when they are not set.
 */
export function getAdminCredentials() {
    const user = process.env.ADMIN_USER
    const password = process.env.ADMIN_PASSWORD
    if (!user || !password) return null
    return { user, password }
}

/**
 * Parses an "Authorization: Basic xxx" header value.
 * Returns { user, password } or null when the header is absent or malformed.
 */
export function parseBasicAuth(header) {
    if (!header || typeof header !== 'string') return null
    const match = header.match(/^\s*Basic\s+([A-Za-z0-9+/=]+)\s*$/i)
    if (!match) return null
    let decoded
    try {
        // atob returns a binary string; decode it as UTF-8
        const binary = atob(match[1])
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
        decoded = new TextDecoder().decode(bytes)
    } catch {
        return null
    }
    const separator = decoded.indexOf(':')
    if (separator < 0) return null
    return { user: decoded.slice(0, separator), password: decoded.slice(separator + 1) }
}

async function sha256(value) {
    const data = new TextEncoder().encode(value)
    return new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', data))
}

/**
 * Constant-time string comparison: both values are hashed first so the
 * comparison always runs over 32 bytes, whatever the input lengths.
 */
async function constantTimeEquals(a, b) {
    const [ha, hb] = await Promise.all([sha256(a), sha256(b)])
    let diff = 0
    for (let i = 0; i < ha.length; i++) {
        diff |= ha[i] ^ hb[i]
    }
    return diff === 0
}

/**
 * Checks an Authorization header against the configured credentials.
 * Returns one of AUTH_OK, AUTH_MISSING, AUTH_INVALID, AUTH_NOT_CONFIGURED.
 */
export async function checkAdminAuth(authorizationHeader) {
    const expected = getAdminCredentials()
    if (!expected) return AUTH_NOT_CONFIGURED

    const provided = parseBasicAuth(authorizationHeader)
    if (!provided) return AUTH_MISSING

    // Evaluate both comparisons to avoid leaking which part was wrong.
    const [userOk, passwordOk] = await Promise.all([
        constantTimeEquals(provided.user, expected.user),
        constantTimeEquals(provided.password, expected.password),
    ])
    return userOk && passwordOk ? AUTH_OK : AUTH_INVALID
}

import { NextResponse } from 'next/server'
import { ADMIN_REALM, AUTH_OK, AUTH_NOT_CONFIGURED, checkAdminAuth } from '@/utils/adminAuth'

/**
 * Protects the admin page and the admin API routes with Basic Authentication.
 * Access is refused when ADMIN_USER / ADMIN_PASSWORD are not configured.
 */
export async function middleware(request) {
    const result = await checkAdminAuth(request.headers.get('authorization'))

    if (result === AUTH_OK) {
        return NextResponse.next()
    }

    if (result === AUTH_NOT_CONFIGURED) {
        console.error('[admin] ADMIN_USER / ADMIN_PASSWORD are not set: admin access is disabled')
        return new NextResponse('Admin access is not configured on this server.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
        })
    }

    return new NextResponse('Authentication required.', {
        status: 401,
        headers: {
            'WWW-Authenticate': `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    })
}

export const config = {
    matcher: ['/admin', '/admin/:path*', '/api/admin', '/api/admin/:path*'],
}

import { adminHandler, proxyToMaestro } from '@/utils/maestro'

// GET /api/admin/status -> Maestro GET /admin/status (dashboard metrics)
export default adminHandler(['GET'], (req, res) =>
    proxyToMaestro(res, { method: 'GET', path: '/admin/status' }))

import { adminHandler, proxyToMaestro } from '@/utils/maestro'

// GET /api/admin/health -> Maestro GET /admin/health (SmallRye Health behind the API key, 503 when DOWN)
export default adminHandler(['GET'], (req, res) =>
    proxyToMaestro(res, { method: 'GET', path: '/admin/health', extraOkStatuses: [503] }))

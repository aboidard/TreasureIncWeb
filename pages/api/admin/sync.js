import { adminHandler, proxyToMaestro } from '@/utils/maestro'

// POST /api/admin/sync -> Maestro POST /admin/sync (force Redis -> Postgres synchronisation).
// Maestro waits up to maestro.engine.sync-timeout (30 s) for the engine: allow more than that.
export default adminHandler(['POST'], (req, res) =>
    proxyToMaestro(res, { method: 'POST', path: '/admin/sync', minTimeoutMs: 45000 }))

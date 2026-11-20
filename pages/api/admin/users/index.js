import { adminHandler, proxyToMaestro } from '@/utils/maestro'

// GET  /api/admin/users -> Maestro GET  /users (all users, newest first)
// POST /api/admin/users -> Maestro POST /users (creates a user with generated keys)
export default adminHandler(['GET', 'POST'], (req, res) =>
    proxyToMaestro(res, { method: req.method, path: '/users' }))

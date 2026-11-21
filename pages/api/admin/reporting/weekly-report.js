import { adminHandler, proxyToMaestro } from '@/utils/maestro'

// POST /api/admin/reporting/weekly-report -> Maestro GET /reporting/sendWeeklyReport.
// Exposed as POST here because it has a side effect (an email is sent to the admin).
export default adminHandler(['POST'], (req, res) =>
    proxyToMaestro(res, { method: 'GET', path: '/reporting/sendWeeklyReport' }))

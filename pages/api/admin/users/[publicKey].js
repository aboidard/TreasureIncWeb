import { adminHandler, isValidPublicKey, proxyToMaestro } from '@/utils/maestro'

// GET /api/admin/users/:publicKey -> Maestro GET /users/{publicKey}
// PUT /api/admin/users/:publicKey -> Maestro PUT /users/{publicKey} (only "money" is updatable)
export default adminHandler(['GET', 'PUT'], (req, res) => {
    const { publicKey } = req.query
    if (!isValidPublicKey(publicKey)) {
        return res.status(400).json({ error: 'invalid_public_key', message: 'publicKey invalide.' })
    }
    const path = `/users/${encodeURIComponent(publicKey)}`

    if (req.method === 'PUT') {
        const money = req.body && req.body.money
        if (!Number.isInteger(money) || money < 0 || money > 2147483647) {
            return res.status(400).json({ error: 'invalid_money', message: 'money doit être un entier entre 0 et 2147483647.' })
        }
        return proxyToMaestro(res, { method: 'PUT', path, body: { money } })
    }
    return proxyToMaestro(res, { method: 'GET', path })
})

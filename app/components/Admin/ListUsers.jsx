import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { adminFetch, formatDate, formatValue } from '@/utils/adminApi'
import { Button, ConfirmDialog, ErrorBanner, Panel, Spinner, inputClassName } from './ui'

const PAGE_SIZE = 25

/**
 * Players list (Maestro GET /users), lookup by publicKey (GET /users/{publicKey})
 * and creation (POST /users).
 */
function ListUsers({ onSelect }) {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState('')
    const [page, setPage] = useState(0)

    const [lookupKey, setLookupKey] = useState('')
    const [lookupError, setLookupError] = useState(null)
    const [lookingUp, setLookingUp] = useState(false)

    const [confirmCreate, setConfirmCreate] = useState(false)
    const [creating, setCreating] = useState(false)

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await adminFetch('/users')
            setUsers(Array.isArray(data) ? data : [])
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { load() }, [load])

    const filtered = useMemo(() => {
        if (!users) return []
        const f = filter.trim()
        return f ? users.filter(u => String(u.publicKey || '').includes(f) || String(u.id) === f) : users
    }, [users, filter])
    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, pageCount - 1)
    const visible = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)

    const lookup = async e => {
        e.preventDefault()
        const key = lookupKey.trim()
        if (!key) return
        setLookingUp(true)
        setLookupError(null)
        try {
            onSelect(await adminFetch(`/users/${encodeURIComponent(key)}`))
        } catch (err) {
            setLookupError(err.status === 404 ? { message: `Aucun joueur avec la publicKey « ${key} ».` } : err)
        } finally {
            setLookingUp(false)
        }
    }

    const create = async () => {
        setConfirmCreate(false)
        setCreating(true)
        setError(null)
        try {
            const user = await adminFetch('/users', { method: 'POST' })
            load()
            onSelect(user, { created: true })
        } catch (e) {
            setError(e)
        } finally {
            setCreating(false)
        }
    }

    return (
        <>
            <Panel title="Rechercher un joueur">
                <form onSubmit={lookup} className="flex flex-wrap gap-3 items-center">
                    <input type="search" value={lookupKey} onChange={e => setLookupKey(e.target.value)}
                        placeholder="publicKey (ex. 12345678900)" className={`${inputClassName} w-72`} autoComplete="off" />
                    <Button type="submit" disabled={lookingUp || !lookupKey.trim()}>
                        {lookingUp ? <Spinner /> : 'Ouvrir la fiche'}
                    </Button>
                </form>
                {lookupError && <div className="mt-4"><ErrorBanner error={lookupError} /></div>}
            </Panel>

            <Panel title={`Joueurs${users ? ` (${users.length})` : ''}`}
                actions={<>
                    <Button variant="ghost" onClick={load} disabled={loading}>{loading ? <Spinner /> : '↻ Recharger'}</Button>
                    <Button onClick={() => setConfirmCreate(true)} disabled={creating}>
                        {creating ? <Spinner /> : '+ Créer un joueur'}
                    </Button>
                </>}>
                <ErrorBanner error={error} onRetry={load} />
                <input type="search" value={filter} onChange={e => { setFilter(e.target.value); setPage(0) }}
                    placeholder="Filtrer par publicKey ou id" className={`${inputClassName} w-72 mb-4`} autoComplete="off" />
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-400 border-b border-gray-600">
                            <tr>
                                <th className="py-2 pr-4">id</th>
                                <th className="py-2 pr-4">publicKey</th>
                                <th className="py-2 pr-4 text-right">money</th>
                                <th className="py-2 pr-4">créé le</th>
                                <th className="py-2 pr-4">modifié le</th>
                                <th className="py-2 pr-4">dernière connexion</th>
                                <th className="py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map(user => (
                                <tr key={user.id ?? user.publicKey} className="border-b border-gray-700 hover:bg-gray-900">
                                    <td className="py-2 pr-4">{formatValue(user.id)}</td>
                                    <td className="py-2 pr-4 font-mono">{formatValue(user.publicKey)}</td>
                                    <td className="py-2 pr-4 text-right">{formatValue(user.money)}</td>
                                    <td className="py-2 pr-4">{formatDate(user.createdAt)}</td>
                                    <td className="py-2 pr-4">{formatDate(user.updatedAt)}</td>
                                    <td className="py-2 pr-4">{formatDate(user.lastLogin)}</td>
                                    <td className="py-2 text-right">
                                        <Button variant="ghost" onClick={() => onSelect(user)}>Fiche</Button>
                                    </td>
                                </tr>
                            ))}
                            {users && visible.length === 0 &&
                                <tr><td colSpan={7} className="py-4 text-center text-gray-400">Aucun joueur.</td></tr>
                            }
                            {!users && loading &&
                                <tr><td colSpan={7} className="py-4 text-center"><Spinner /></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                {pageCount > 1 &&
                    <div className="flex items-center justify-end gap-3 mt-4 text-sm">
                        <Button variant="ghost" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>‹</Button>
                        <span>page {currentPage + 1} / {pageCount}</span>
                        <Button variant="ghost" disabled={currentPage >= pageCount - 1} onClick={() => setPage(currentPage + 1)}>›</Button>
                    </div>
                }
            </Panel>

            <ConfirmDialog open={confirmCreate} title="Créer un joueur ?" confirmLabel="Créer"
                onConfirm={create} onCancel={() => setConfirmCreate(false)}>
                Maestro va créer un nouveau joueur avec des clés générées et le solde par défaut.
            </ConfirmDialog>
        </>
    )
}

export default ListUsers

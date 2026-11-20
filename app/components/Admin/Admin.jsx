import React, { useState } from 'react'
import Dashboard from './Dashboard'
import ListUsers from './ListUsers'
import EditUser from './EditUser'
import Reporting from './Reporting'

const TABS = [
    { id: 'dashboard', label: 'Tableau de bord' },
    { id: 'users', label: 'Joueurs' },
    { id: 'reporting', label: 'Rapports' },
]

/**
 * Admin back-office: the web interface of Maestro.
 * Every call goes through the /api/admin/* routes of this Next server.
 */
function Admin() {
    const [tab, setTab] = useState('dashboard')
    const [selected, setSelected] = useState(null)

    const selectUser = (user, { created = false } = {}) => setSelected({ user, created })

    return (
        <div className="flex flex-col text-white mx-4 md:mx-20 my-6 readableFont">
            <nav className="flex flex-wrap gap-2 mb-6">
                {TABS.map(t => (
                    <button key={t.id} type="button" onClick={() => { setTab(t.id); setSelected(null) }}
                        className={`font-kenvector px-4 py-2 rounded-md text-sm focus:outline-none ${tab === t.id ? 'bg-gray-500 ring-2 ring-black text-white' : 'bg-gray-900 text-gray-300 hover:bg-gray-700'}`}>
                        {t.label}
                    </button>
                ))}
            </nav>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'users' && (selected
                ? <EditUser key={selected.user.publicKey} user={selected.user} created={selected.created} onBack={() => setSelected(null)} />
                : <ListUsers onSelect={selectUser} />)}
            {tab === 'reporting' && <Reporting />}
        </div>
    )
}

export default Admin

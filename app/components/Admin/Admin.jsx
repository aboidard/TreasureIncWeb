import { useRef, useState } from 'react'
import { useUsers } from '@/hooks/users'
import ListUsers from './ListUsers'
import EditUser from './EditUser'

function Admin() {
    const LIST_USERS = 0
    const LIST_ITEMS = 1
    const EDIT_USERS = 2

    const [pageToDisplay, setPageToDisplay] = useState(LIST_USERS)
    const [userToEdit, setUserToEdit] = useState()
    const idUser = useRef(null)
    const { users, loading, fetchUsers } = useUsers()
    const searchUsers = () => {
        fetchUsers(10)
        console.debug(idUser.current.value)
    }
    const editUser = function (user) {
        setUserToEdit(user)
        setPageToDisplay(EDIT_USERS)
    }
    const cancel = function (user) {
        setUserToEdit(null)
        setPageToDisplay(LIST_USERS)
    }
    const save = function (user) {
        setUserToEdit(null)
        setPageToDisplay(LIST_USERS)
    }

    let page = ""
    switch (pageToDisplay) {
        case LIST_USERS:
            page = <div className="">
                <h1>Users</h1>
                <input id="idUser" type="text" ref={idUser}></input>
                <button id="searchUsers" onClick={e => searchUsers()}>Recherche</button>
                <br />
                <ListUsers listUsers={users} loading={loading} editUser={editUser} />
            </div>
            break
        case EDIT_USERS:
            page = <div className="flex flex-col justify-center">
                <EditUser user={userToEdit} loading={loading} cancel={cancel} save={save} />
            </div>
            break
        default:
            page = "lol"
    }

    return (<div className="flex flex-col justify-center text-white mx-20 readableFont">
        {page}
    </div>)
}

export default Admin
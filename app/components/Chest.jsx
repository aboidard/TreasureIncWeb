import SearchUser from '@/components/SearchUser'
import ItemsList from '@/components/ItemsList'
import { useState } from 'react'

function Chest() {
    const [idUser, setIdUser] = useState("")
    return (
        <div className="flex flex-col justify-center">
            <SearchUser setIdUser={setIdUser} />
            {idUser && <ItemsList idUser={idUser} />}
        </div>)
}

export default Chest
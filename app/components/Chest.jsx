import SearchUser from '@/components/SearchUser'
import ItemsList from '@/components/ItemsList'
import { useState } from 'react'


function Chest() {
    const [idUser, setIdUser] = useState("")
    const router = useRouter()
    const defaultId = router.query.id

    return (
        <div className="flex flex-col justify-center">
            <SearchUser setIdUser={setIdUser} defaultId={defaultId} />
            {idUser && <ItemsList idUser={idUser} />}
        </div>)
}

export default Chest
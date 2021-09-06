import SearchUser from "./SearchUser"
import ItemsList from "./ItemsList"
import { useState } from "react";

function Chest() {
    const [idUser, setIdUser] = useState("")
    return (
        <>
            <SearchUser setIdUser={setIdUser} />
            {idUser && <ItemsList idUser={idUser} />}
        </>)
}

export default Chest
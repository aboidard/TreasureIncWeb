import SearchUser from "./SearchUser"
import ItemsList from "./ItemsList"
import { useState } from "react";

function Chest() {
    const [idUser, setIdUser] = useState("")
    return (
        <>
            <p className="text-center">
                Welcome to Treasure INC - chest !
            </p>
            <SearchUser setIdUser={setIdUser} />
            {idUser && <ItemsList idUser={idUser} />}
        </>)
}

export default Chest
import { Loader } from "@/components/Loader"

function ListUsers({ listUsers, loading, editUser }) {

    const itemsList = []

    if (listUsers == undefined) return <></>;

    const handleEdit = function (e) {
        const user = listUsers.find(element => element._id == e.target.id)
        console.log(user)
        editUser(user)
    }

    for (const [index, value] of listUsers.entries()) {
        itemsList.push(
            <tr key={index}>
                <td > {value._id}</td>
                <td > {value._publicKey}</td>
                <td > {value._privateKey}</td>
                <td > {value._money}</td>
                <td > {value._created}</td>
                <td > <button id={value._id} onClick={handleEdit}>Edit</button></td>
                <td > <button id={value._id}>Delete</button></td>
            </tr >)
    }

    return (
        <div className="flex flex-col justify-center">
            {loading ? <><Loader> Chargement...</Loader></> : ""}
            <table>
                <thead>
                    <tr><td>ID</td><td>publicKey</td><td>privateKey</td><td>money</td><td>created</td></tr>
                </thead>
                <tbody>
                    {itemsList}
                </tbody>
            </table>

        </div>)
}

export default ListUsers
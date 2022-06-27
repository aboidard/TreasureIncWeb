import { Loader } from '@/components/Loader'

function EditUser({ user, loading, cancel, save }) {


    if (user == undefined) return <></>;
    const handleCancel = function () {
        cancel()
    }
    const handleOk = function () {
        save()
    }

    return (
        <div className="flex flex-col justify-center">
            {loading ? <><Loader> Chargement...</Loader></> : ""}
            <table>
                <thead>
                    <tr><td>ID</td></tr>
                </thead>
                <tbody>
                    <tr > <td>id :</td>  <td>{user._id}</td></tr>
                    <tr > <td>publicKey :</td>  <td>{user._publicKey}</td></tr>
                    <tr > <td>privateKey :</td>  <td>{user._privateKey}</td></tr>
                    <tr > <td>money :</td>  <td>{user._money}</td></tr>
                    <tr > <td>created :</td>  <td>{user._created}</td></tr>
                    {/* <tr > <button id={user._id} onClick={handleOk}>OK</button></tr> */}
                    <tr > <button id={user._id} onClick={handleCancel}>Cancel</button></tr>
                </tbody>
            </table>

        </div>)
}

export default EditUser
import { useEffect, useState, useCallback } from "react"
import { useItems } from "../hooks/items"
import Item from "./Item"
import { Loader } from "./Loader"
import SearchUser from "./SearchUser"

function Chest(props) {

    const { items, loading, fetchItems } = useItems()
    const [page, setPage] = useState(0)
    const [changePage, setChangePage] = useState(true)
    const itemsList = []

    const handleScroll = function (e) {
        const bottom = document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight;

        if (bottom && !loading) {
            setChangePage(true)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);
    }, [])

    useEffect(() => {
        if (!changePage) return
        fetchItems("12345678900", 12, page)
        setPage(prevState => prevState + 1)
        setChangePage(false)
    }, [changePage])




    for (const [index, value] of items.entries()) {
        itemsList.push(<Item key={index} itemInfo={value} />)
    }

    return (
        <>
            <p className="text-center">
                Welcome to Treasure INC - chest !
            </p>
            <SearchUser />
            {page} {loading && "loading"}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm: gap-4 justify-center">
                {itemsList}
            </div>
            {loading ? <><Loader> Chargement...</Loader></> : ""}
        </>)
}




export default Chest
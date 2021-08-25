import { useEffect, useState, useRef } from "react"
import { useItems } from "../hooks/items"
import Item from "./Item"
import { Loader } from "./Loader"
import SearchUser from "./SearchUser"
import { scrollToTop } from "../utils/window"

function Chest(props) {

    const { items, loading, limitReach, fetchItems } = useItems()
    const limitReachRef = useRef(limitReach)
    const loadingRef = useRef(loading)
    const [page, setPage] = useState(0)
    const [buttonTopVisible, setButtonTopVisible] = useState(false)
    const itemsList = []


    const handleScroll = (e) => {
        let scrollTop = document.documentElement.scrollTop
        const bottom = document.documentElement.scrollHeight - scrollTop === document.documentElement.clientHeight;

        // appel à la page suivante de l'api une fois arrivé en bas de l'écran
        if (bottom && !loadingRef.current && !limitReachRef.current) {
            setPage(prevPage => prevPage + 1)
        }

        // on affiche le bouton pour revenir en haut de l'écran apres un scroll de 300
        setButtonTopVisible(scrollTop > 300)
    }

    useEffect(() => {
        //evenement de scroll pour le chargement infini + le bouton de retour au début de la page
        window.addEventListener("scroll", handleScroll, false);
    }, [])

    useEffect(() => {
        if (limitReach) return
        fetchItems("12345678900", 12, page)
    }, [page])

    //msie à jour des refs pour les états limitReach et loading 
    useEffect(() => {
        limitReachRef.current = limitReach
        loadingRef.current = loading
    }, [limitReach, loading])

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
            {buttonTopVisible && <button className="fixed text-3xl rounded-md right-6 bottom-3 py-2 px-4 bg-red-700 text-white" onClick={scrollToTop}>🠕</button>}
        </>)
}




export default Chest
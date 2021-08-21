import { useEffect } from "react"
import { useItems } from "../hooks/items"
import Item from "./Item"

function ChestHome(props) {

    const { items, fetchItems } = useItems()
    const itemsList = []

    useEffect(() => {
        fetchItems("12345678900")
    }, [])

    for (const [index, value] of items.entries()) {
        itemsList.push(<Item key={index} itemInfo={value} />)
    }

    return (
        <><p className="text-center">
            Welcome to Treasure INC - chest !
        </p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm: gap-4 justify-center">
                {itemsList}
            </div>
        </>)
}




export default ChestHome
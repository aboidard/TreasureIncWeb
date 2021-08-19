import Item from "./Item"

function ChestHome({ items }) {

    const itemsList = []

    for (const [index, value] of items.entries()) {
        itemsList.push(<Item key={index} itemInfo={value} />)
    }

    return (
        <><p>
            Welcome to Treasure INC - chest !
        </p>
            <div className="grid grid-cols-3 gap-4">
                {itemsList}
            </div>
        </>)
}




export default ChestHome
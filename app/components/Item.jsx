function Item({ itemInfo }) {

    let rarityColor = getRarityColor(itemInfo.rarity)

    return (
        <div className="bg-black text-white rounded-xl p-8 flex flex-col items-center w-56">
            <p className={"text-" + rarityColor + "-700"}>{itemInfo.name}</p>
            <img className="pixelImage" width="100" height="100" src={"/assets/" + itemInfo.graphics + ".png"} alt="logo" />
        </div>
    )
}

export default Item

function getRarityColor(rarity) {
    let rarityColor;
    switch (rarity) {
        case 'Uncommon':
            rarityColor = "green"
            break
        case 'Rare':
            rarityColor = "blue"
            break
        case 'Epic':
            rarityColor = "purple"
            break
        case 'Legendary':
            rarityColor = "orange"
            break
        default:
            rarityColor = "white"
    }
    return rarityColor
}
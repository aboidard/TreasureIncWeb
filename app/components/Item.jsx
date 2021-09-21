function Item({ itemInfo }) {

    let rarityColor = getRarityColor(itemInfo.rarity)

    let fontSize;
    if (itemInfo.name.length >= 27)
        fontSize = "text-2xs my-1"
    else if (itemInfo.name.length >= 20)
        fontSize = "text-xs  my-0.5"
    else
        fontSize = "text-md"

    return (
        <div className="bg-black text-white rounded-xl p-8 flex flex-col items-center w-56">
            <span className={`-mx-10 text-${rarityColor} ${fontSize}`}>{itemInfo.name}</span>
            <img className="pixelImage" width="100" height="100" src={"/assets/" + itemInfo.graphics + ".png"} alt="logo" />
        </div>
    )
}

export default Item

function getRarityColor(rarity) {
    let rarityColor;
    switch (rarity) {
        case 'Uncommon':
            rarityColor = "green-700"
            break
        case 'Rare':
            rarityColor = "blue-700"
            break
        case 'Epic':
            rarityColor = "purple-700"
            break
        case 'Legendary':
            rarityColor = "red-700"
            break
        default:
            rarityColor = "white-700"
    }
    return rarityColor
}
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

function getFontSize(length) {
    if (length >= 27)
        return "text-2xs my-1"
    else if (length >= 20)
        return "text-xs  my-0.5"
    else
        return "text-md"
}

export { getRarityColor, getFontSize }
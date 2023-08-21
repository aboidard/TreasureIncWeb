import { useState } from 'react'
import ItemTooltip from './ItemTooltip';
import { getRarityColor, getFontSize } from '@/utils/items'

function Item({ itemInfo }) {

    const [isHovering, setIsHovering] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const handleMouseMove = (e) => {
        setPosX(e.pageX);
        setPosY(e.pageY);
    };

    let rarityColor = getRarityColor(itemInfo.rarity)

    let fontSize = getFontSize(itemInfo.name.length);


    return (
        <div className="bg-black text-white rounded-xl p-8 flex flex-col items-center w-56"
            onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onMouseMove={handleMouseMove}>
            <span className={`-mx-10 text-${rarityColor} ${fontSize}`}>{itemInfo.name}</span>
            <img className="pixelImage" width="100" height="100" src={"/assets/" + itemInfo.graphics + ".png"} alt="logo" />
            {isHovering && <ItemTooltip itemInfo={itemInfo} posX={posX} posY={posY} />}
        </div>
    )
}

export default Item

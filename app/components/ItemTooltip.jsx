import React from 'react'
import { getRarityColor, getFontSize } from '@/utils/items'

function ItemTooltip({ itemInfo, posX, posY }) {
    let rarityColor = getRarityColor(itemInfo.rarity)
    return (
        <div className={`block rounded-lg bg-white dark:bg-neutral-700 w-1/4 absolute`}
            style={{ top: `${posY - 70}px`, left: `${posX + 10}px` }}>
            <div className={`mx-7 my-5`}>
                <span className={`text-${rarityColor} text-2xl `}>{itemInfo.name}</span>
                {/*  <img className="absolute pixelImage mt-4 top-0 right-4 border-4" width="100" height="100" src={"/assets/" + itemInfo.graphics + ".png"} alt="logo" /> */}
            </div>

            <div className={`mx-10 `}><span>Effet : Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span></div><br />
            <div className={`mx-10 `}>
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-600">
                    <svg class="w-8 h-8 text-gray-400 dark:text-gray-400 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                    <p>{itemInfo.description}</p></blockquote>
            </div><br />
            <div className={`mx-10 `}><span>Prix : {itemInfo.price}</span></div><br />
        </div >
    )
}

export default ItemTooltip

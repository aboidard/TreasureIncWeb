import Image from 'next/image'
import React from 'react'

import playstore from '@/public/Download_Play_Store.png'
import appstore from '@/public/Download_App_Store.svg'

function GetItModal({ toggleModal }) {
    return (<>
        <button onClick={toggleModal}>
            <div className="fixed bg-black opacity-80 inset-0 z-0"></div>
        </button>
        <div className="p-5 fixed rounded-xl shadow-lg top-40 bg-white left-2/4 w-[300px] ml-[-150px]">
            {/* content */}
            <div>
                {/* body */}
                <button onClick={toggleModal} className="right-1 top-1 absolute">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="p-5">
                    <div >
                        <Image src={playstore} layout="responsive" alt="Play store" />
                    </div>
                    <div className="mt-5">
                        <Image src={appstore} layout="responsive" alt="App store" />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default GetItModal

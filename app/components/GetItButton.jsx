import React from 'react'
import Image from 'next/image'
import logo from '@/public/favicon.ico'

export default function GetItButton({ className = "", toggleModal }) {

    return (
        <div onClick={e => toggleModal()} className={"bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 w-56 shadow-2xl ring-4  ring-black rounded-md flex items-center self-center " + className}>
            <Image className="m-6"
                src={logo} alt="TINC logo" width={50} height={50}
            />
            <p className="text-gray-300 text-2xl"> Get it</p>
        </div>
    )
}

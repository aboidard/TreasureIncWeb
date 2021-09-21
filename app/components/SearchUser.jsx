import React from 'react'
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";

export default function SearchUser({ setIdUser }) {

    const debouncedFunction = useConstant(() =>
        AwesomeDebouncePromise(setIdUser, 1000)
    );

    return (
        <div className='has-tooltip mx-auto flex'>
            <div className="relative mb-4 text-gray-600 focus-within:text-gray-400 space-x-4 mx-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button className="p-4 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </span>
                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-7 text-sm'>demo ID : 12345678900</span>
                <input type="search" name="q" onChange={e => debouncedFunction(e.target.value)} className="py-2 text-md text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Enter your player's ID" autoComplete="off" />
            </div>
        </div>
    )
}

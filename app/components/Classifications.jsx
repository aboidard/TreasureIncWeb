import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Classifications({ src = [] }) {
    return (<>
        {src.map((element, index) => (
            <div className="m-1 opacity-50 hover:opacity-100" key={index}>
                <Link href={element.url} >
                    <a target="_blank">
                        <Image src={element.image} />
                    </a>
                </Link>
            </div>
        ))
        }
    </>
    )
}

export default Classifications

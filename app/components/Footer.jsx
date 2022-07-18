import Link from 'next/link'
import React from 'react'

function Footer({ className }) {
    return (
        <footer className={"text-center " + className} >
            <span className='readableFont'>©</span> 2022 <Link href="https://www.linkedin.com/in/arnaud-boidard-6897ab159/" rel="noreferrer" target="_blank"> Arnaud Boidard</Link >
            <br />
            <Link href={"/privacy"}>Privacy Policy</Link>
        </footer >
    )
}

export default Footer

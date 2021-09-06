import React from 'react'
import Head from 'next/head'
import Nav from './nav'
import Link from 'next/link'


function LightContainer({ children, className = "" }) {

    return (
        <div className={"flex flex-col bg-gray-800 items-center min-h-screen py-2 " + className}>
            <Head>
                <title>Treasure INC</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main className="w-full h-full">
                {children}
            </main>
            <footer>
                Treasure Inc Copyright © 2021 <a href="https://twitter.com/Skouik" target="_blank">Arnaud Boidard</a>
            </footer>
        </div>
    )
}

export default LightContainer


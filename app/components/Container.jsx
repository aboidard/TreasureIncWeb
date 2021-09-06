import React from 'react'
import Head from 'next/head'
import Nav from './nav';

function Container({ children, title, className = "" }) {

    return (
        <div className={"flex flex-col bg-gray-800 items-center min-h-screen py-2 " + className}>
            <Head>
                <title>Treasure INC - {title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />

            <main className="relative inset-0">
                <header >
                    <a href="http://localhost:3000"><img src="/Treasure_inc_logo.png" alt="logo" className="m-auto" /></a>
                </header>
                <div className="relative inset-0 ">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Container


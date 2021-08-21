import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link';

function Container({ children, className = "" }) {

    return (
        <div className={"flex flex-col bg-gray-500 items-center min-h-screen py-2 " + className}>
            <Head>
                <title>Treasure INC - chest</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className="flex items-center justify-between w-full max-w-4xl p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black bg-opacity-60 dark:text-gray-100">
                <div>
                    <NextLink href="/">
                        <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Home</a>
                    </NextLink>
                    <NextLink href="/chest">
                        <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Chest</a>
                    </NextLink>

                </div>
            </nav>

            <main className="relative inset-0">
                <header >
                    <a href="http://localhost:3000"><img src="/Treasure_inc_logo.png" alt="logo" className="m-auto" /></a>
                </header>
                <div className="relative inset-0 ">
                    {children}
                </div>
            </main>
            {/* <footer>the footer</footer> */}
        </div>
    )
}

export default Container


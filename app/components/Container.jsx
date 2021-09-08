import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/nav';
import Footer from '@/components/Footer';

function Container({ children, title, className = "", light = false }) {

    return (
        <div className={"flex flex-col bg-gray-800 items-center min-h-screen py-2 " + className}>
            <Head>
                <title>Treasure INC{!light && " - " + title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />

            <main className="w-full">
                {!light &&
                    <header >
                        <Link href="/"><a><img src="/Treasure_inc_logo.png" alt="logo" className="m-auto" /></a></Link>
                    </header>
                }
                <div className="w-full h-full">
                    {children}
                </div>

                <Footer />
            </main>
        </div>
    )
}

export default Container


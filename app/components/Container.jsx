import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

function Container({ children, title = "", classNameFooter = "", light = false }) {

    const pageTitle = light ? "Treasure INC" : "Treasure INC - " + title
    return (
        <div className={"flex flex-col bg-gray-800 items-center min-h-screen py-2 font-kenvector "}>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="/fonts/kenvector_future_thin.ttf" rel="preload" as="font" crossOrigin="" />
            </Head>

            <Nav />

            <main className="w-full">
                {!light &&
                    <header >
                        <Link href="/"><a><img src="/Treasure_inc_logo.png" alt="logo" className="m-auto" /></a></Link>
                    </header>
                }
                <div className="w-full h-full" >
                    {children}
                </div>

                <Footer className={classNameFooter} />
            </main>
        </div>
    )
}

export default Container


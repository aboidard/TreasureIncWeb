import Link from 'next/link'
import Image from 'next/image'
import discord from '@/public/thirdParty/Discord-Logo-White.png'

export default function Nav() {
    return (
        <nav className="flex items-center justify-between w-full max-w-4xl p-0 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black bg-opacity-60 dark:text-gray-100">
            <div className="justify-center">
                <Link href="/" className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">
                    Home
                </Link>
                <Link href="/chest" className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">
                    Chest
                </Link>
                <Link
                    href="/blogStatic"
                    className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">
                    Blog
                </Link>
                <Link href="/support" className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">
                    Support
                </Link>
            </div>
            <div className="mt-2 mr-2">
                <Link href="https://discord.gg/U28geccwM5" target="_blank">

                    <Image layout="fixed" src={discord} width={50} height={38} />

                </Link>
            </div>
        </nav>
    );
}

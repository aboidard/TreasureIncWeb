import Link from "next/link"

export default function Nav() {
    return (
        <nav className="flex items-center justify-between w-full max-w-4xl p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black bg-opacity-60 dark:text-gray-100">
            <div>
                <Link href="/">
                    <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Home</a>
                </Link>
                <Link href="/chest">
                    <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Chest</a>
                </Link>
                <Link href="/blogStatic">
                    <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Blog</a>
                </Link>
                <Link href="/support">
                    <a className="p-1 text-gray-900 sm:p-4 dark:text-gray-100">Support</a>
                </Link>
            </div>
        </nav>
    )
}

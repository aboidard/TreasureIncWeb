import Head from 'next/head'
import ChestHome from '../components/ChestHome'

export default function Home({ items }) {
  return (
    <div className="flex flex-col bg-gray-500 items-center min-h-screen py-2">
      <Head>
        <title>Treasure INC - chest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative inset-0">
        <header><h1>
          <a href="http://localhost:3000"><img src="/Treasure_inc_logo.png" alt="logo" /></a>
        </h1>
        </header>
        <div className="relative inset-0">
          <ChestHome items={items} />
        </div>
      </main>
      {/* <footer>the footer</footer> */}
    </div>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:8081/version')
//   const infos = await res.json()
//   console.log(`les infos du server : ${JSON.stringify(infos)}`)
//   return {
//     props: {
//       infos,
//     },
//   }
// }

export async function getServerSideProps(context) {

  const res = await fetch('http://localhost:8081/user/12345678900/items')
  const items = await res.json()
  console.log(`les items : ${JSON.stringify(items)}`)
  console.log(`item 0 : ${items[0].name}`)

  return {
    props: {
      items,
    },
  }
}
import Head from 'next/head'
import Main from './main'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Treasure INC - chest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header><h1 className="title">
          <a href="http://localhost:3000"><img src="/Treasure_inc_logo.png" alt="logo" /></a>
        </h1>
        </header>

        <Main />

      </main>
      <footer>the footer</footer>
    </div>
  )
}

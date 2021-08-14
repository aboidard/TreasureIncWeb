
export async function getStaticProps() {
    const res = await fetch('/version')
    const infos = await res.json()
    return {
        props: {
            infos,
            lol: "salut gros",
        },
    }
}

export default function Main({ lol, infos }) {
    console.log(lol)

    return (
        <><p>
            Welcome to Treasure INC - chest !
        </p>

            <p>
                Server infos {lol}: <code>{infos}</code>
            </p>

            <div className="grid">
                <a href="http://localhost:8081/version" target="#">
                    <h3>API &rarr;</h3>
                </a>
                Lorem ipsum dolor sit
            </div>
        </>)
}

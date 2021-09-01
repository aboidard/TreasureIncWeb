import Chest from '../app/components/Chest'
import Container from '../app/components/Container'

export default function ChestPage({ infos }) {
  return (
    <Container>
      <Chest />
      <div className="text-center"> server version : {infos.version}</div>
    </Container>
  )
}

export async function getStaticProps(context) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_CHEST_HOST_URL}/${process.env.NEXT_PUBLIC_CHEST_ENDPOINT_INFOS}`)
  const infos = await res.json()

  return {
    props: {
      infos,
    },
  }
}
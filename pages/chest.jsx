import Chest from '@/app/components/Chest'
import Container from '@/components/Container'

export default function ChestPage({ infos }) {
  return (
    <Container title="Chest">
      <p className="text-center">
        Welcome to Treasure INC - chest !
      </p>
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
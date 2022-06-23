import Admin from '@/app/components/Admin/Admin'
import Container from '@/components/Container'

export default function AdminPage({ infos }) {
  return (
    <Container title="Admin">
      <Admin />
      <div className="text-center"> server version : {version}</div>
    </Container>
  )
}

export async function getStaticProps(context) {

  //const res = await fetch(`${process.env.NEXT_PUBLIC_CHEST_HOST_URL}/${process.env.NEXT_PUBLIC_CHEST_ENDPOINT_INFOS}`)
  //const infos = await res.json()
  const version = process.env.NEXT_PUBLIC_SERVER_VERION

  return {
    props: {
      version,
    },
  }
}
import Admin from '@/app/components/Admin/Admin'
import Container from '@/components/Container'
import getConfig from 'next/config'

const { publicRuntimeConfig: config } = getConfig()

export default function AdminPage({ infos }) {
  return (
    <Container title="Admin">
      <Admin />
      <div className="text-center"> server version : 0.0.3</div>
    </Container>
  )
}

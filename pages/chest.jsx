import Chest from '@/app/components/Chest'
import Container from '@/components/Container'
import getConfig from 'next/config'

const { publicRuntimeConfig: config } = getConfig()

export default function ChestPage({ infos }) {
  return (
    <Container title="Chest">
      <p className="text-center">
        Welcome to Treasure INC - chest !
      </p>
      <Chest />
      <div className="text-center"> server version : 0.0.3</div>
    </Container>
  )
}

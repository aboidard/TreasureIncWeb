import Container from '../app/components/Container'

export default function Home({ items }) {
  return (
    <Container>
      <p>les infos sur le jeu</p>

      <a href="/chest">le lien vers chest</a>
    </Container>
  )
}
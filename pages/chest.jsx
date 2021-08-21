import ChestHome from '../app/components/Chest'
import Container from '../app/components/Container'

export default function Chest({ items }) {
  return (
    <Container>
      <ChestHome items={items} />
    </Container>
  )
}

// export async function getServerSideProps(context) {

//   const res = await fetch('http://localhost:8081/user/12345678900/items')
//   const items = await res.json()
//   console.log(`les items : ${JSON.stringify(items)}`)
//   console.log(`item 0 : ${items[0].name}`)

//   return {
//     props: {
//       items,
//     },
//   }
// }
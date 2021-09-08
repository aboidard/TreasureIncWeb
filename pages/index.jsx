
import Container from "@/components/Container"
import GetItButton from "@/components/GetItButton"
import Carousel from "@/components/Carousel"
import { useToggle } from '@/hooks/toggle'
import screenShot1 from '@/public/screenshots/treasure_inc_screen_1.png'
import screenShot2 from '@/public/screenshots/treasure_inc_screen_2.png'
import screenShot3 from '@/public/screenshots/treasure_inc_screen_3.png'
import screenShot4 from '@/public/screenshots/treasure_inc_screen_4.png'
import GetItModal from "@/components/GetItModal"


export default function Home() {

  const slides = [screenShot1, screenShot2, screenShot3, screenShot4]

  const [displayModal, toggleModal] = useToggle(false)

  return (
    <Container light={true}>

      <div className="flex w-full flex-colflex-col justify-center py-4 bg-game-intro bg-top bg-no-repeat h-[45rem]">

        <GetItButton className="p-2 mt-[375px]" toggleModal={toggleModal} />

      </div>

      <hr />
      <div className="mt-10">
        <Carousel slides={slides} />
      </div>
      {displayModal && <GetItModal toggleModal={toggleModal} />}
    </Container>

  )
}
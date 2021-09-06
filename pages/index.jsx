
import LightContainer from "../app/components/LightContainer"
import GetItButton from "../app/components/GetItButton"
import Carousel from "../app/components/Carousel"
import screenShot1 from '../public/screenshots/treasure_inc_screen_1.png'
import screenShot2 from '../public/screenshots/treasure_inc_screen_2.png'
import screenShot3 from '../public/screenshots/treasure_inc_screen_3.png'
import screenShot4 from '../public/screenshots/treasure_inc_screen_4.png'


export default function Home() {

  const slides = [screenShot1, screenShot2, screenShot3, screenShot4]
  console.log(slides)

  return (
    <LightContainer>
      <div className="flex w-full flex-colflex-col justify-center py-4 bg-game-intro bg-top bg-no-repeat h-[45rem]">

        <GetItButton className="p-2 mt-[375px]" />

      </div>
      <hr />
      <div className=" mt-10">
        <Carousel slides={slides} />
      </div>
    </LightContainer>

  )
}
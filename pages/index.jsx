
import Container from '@/components/Container'
import GetItButton from '@/components/GetItButton'
import Carousel from '@/components/Carousel'
import { useToggle } from '@/hooks/toggle'
import screenShot1 from '@/public/screenshots/treasure_inc_screen_1.png'
import screenShot2 from '@/public/screenshots/treasure_inc_screen_2.png'
import screenShot3 from '@/public/screenshots/treasure_inc_screen_3.png'
import screenShot4 from '@/public/screenshots/treasure_inc_screen_4.png'
import screenShot5 from '@/public/screenshots/treasure_inc_screen_5.png'
import ACB_G from '@/public/classifications/ACB_G.png'
import CLASS_IND_L from '@/public/classifications/CLASS_IND_L.png'
import ESRB_EVERYONE from '@/public/classifications/ESRB_EVERYONE.png'
import GENERIC_3 from '@/public/classifications/GENERIC_3.png'
import GOOGLE_3 from '@/public/classifications/GOOGLE_3.png'
import GRAC_AGE_ALL from '@/public/classifications/GRAC_AGE_ALL.png'
import PEGI_3 from '@/public/classifications/PEGI_3.png'
import USK_6 from '@/public/classifications/USK_6.png'
import GetItModal from '@/components/GetItModal'
import Classifications from '@/app/components/Classifications'

export default function Home() {

  const slides = [screenShot1, screenShot2, screenShot3, screenShot4, screenShot5]
  const classifications = [
    { image: ACB_G, url: "https://www.classification.gov.au/" },
    { image: CLASS_IND_L, url: "https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1" },
    { image: ESRB_EVERYONE, url: "https://www.esrb.org/" },
    { image: GENERIC_3, url: "https://www.globalratings.com/" },
    { image: GOOGLE_3, url: "https://support.google.com/googleplay/answer/6209544" },
    { image: GRAC_AGE_ALL, url: "https://www.grac.or.kr/english/" },
    { image: PEGI_3, url: "https://pegi.info/" },
    { image: USK_6, url: "https://www.usk.de/iarc/" },
  ]

  const [displayModal, toggleModal] = useToggle(false)

  return (
    <Container light={true} classNameFooter="bg-gray-400">

      <div className="flex w-full justify-center py-4 bg-game-intro bg-top bg-no-repeat h-[45rem]">

        <GetItButton className="p-2 mt-[375px]" toggleModal={toggleModal} />

      </div>


      <div className="mt-10 bg-gradient-to-b from-gray-800 to-gray-400 bg-gray-400 text-white text-center items-center">

        <p className="text-4xl">Manage a dungeon crawler company</p>
        <p className="mb-5">You are the boss, comfortably and securely seated in your office. gather a team and find the rarest treasures</p>

        <hr className="w-6/12 m-auto" />

        <Carousel slides={slides} />
      </div>
      <div className="bg-gray-400 text-gray-700 text-center py-10">
        <p className="text-4xl">Features</p>
        <ul className="mt-4">
          <li><b>Look for the rarest treasure:</b> travel through an imaginary world filled with danger and mystery</li>
          <li><b>Find an unlimited amout of treasure:</b> the items they contain are randomly generated and each has its own characteristics </li>
          <li><b>Hire the ulimate team of expert:</b> increase the reputation of your company to hire profiles adapted to your ambition </li>
          <li><b>Gear your team with the best items:</b> the treasures contain some powerfull items to rise the power of your team </li>
        </ul>
      </div>
      <div className="bg-gray-400 w-full flex justify-center">
        <div className="inline-flex max-w-sm items-center">
          <Classifications src={classifications} />
        </div>
      </div>
      {displayModal && <GetItModal toggleModal={toggleModal} />}
    </Container >

  )
}
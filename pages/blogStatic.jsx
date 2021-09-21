import Container from '@/components/Container'
import Image from 'next/image'
import countdown from '@/public/countdown.png'
import avatar from '@/public/avatar_ABO.png'

export default function ChestPage() {
    return (
        <Container title="Support">
            <br />
            <div className="flex flex-col items-center justify-center text-white m-auto mb-32">
                <div className="w-5/12">
                    <div className="text-5xl"> Countdown ! </div>
                    <div className="text-md">
                        <Image src={avatar} alt={"avatar"} width={30} height={30} className="rounded-full" /> <span> by Arnaud Boidard / september 21, 2021</span>
                    </div>
                    <Image src={countdown} alt={"countdown"} className="object-cover " />
                    <div className="mt-10">
                        Great news ! The open beta is scheduled for the week of September 27. Keep in touch for more informations about the beta and the game !
                    </div>
                </div>
            </div>
        </Container>
    )
}

import Container from '@/components/Container'
import Image from 'next/image'
import countdown from '@/public/countdown.png'
import avatar from '@/public/avatar_ABO.png'

export default function ChestPage() {
    return (
        <Container title="Blog">
            <br />
            <div className="flex flex-col items-center justify-center text-white m-auto mb-32">
                <div className="w-5/12">
                    <div className="text-5xl"> Live ! </div>
                    <div className="text-md">
                        <Image src={avatar} alt={"avatar"} width={30} height={30} className="rounded-full" /> <span> by Arnaud Boidard / July 13, 2022</span>
                    </div>
                    <Image src={countdown} alt={"countdown"} className="object-cover " />
                    <div className="mt-10">
                        Great news ! The open alpha is live ! Keep in touch for more informations about the alpha and the game !
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center text-white m-auto mb-32">
                <div className="w-5/12">
                    <div className="text-5xl"> ALPHA ! </div>
                    <div className="text-md">
                        <Image src={avatar} alt={"avatar"} width={30} height={30} className="rounded-full" /> <span> by Arnaud Boidard / september 28, 2021</span>
                    </div>
                    <div className="mt-10">
                        Finaly ! the game came out in android. Send an email at <a id="support" href="mailto://contact@treasure-inc.fr">contact@treasure-inc.fr</a> to download the game and be part of the adventure !
                    </div>
                </div>
            </div>
        </Container>
    )
}

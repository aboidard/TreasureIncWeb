import Container from '@/components/Container'
import Image from 'next/image'
import countdown from '@/public/countdown.png'

export default function ChestPage() {
    return (
        <Container title="Support">
            <br />
            <div className="flex flex-col items-center justify-center text-white m-auto ">
                <div className="w-5/12">
                    <h1 className="text-5xl"> Countdown ! </h1>
                    <p className="text-gray-400 text-sm">published 21/09/2021</p>
                    <Image src={countdown} alt={"countdown"} className="object-cover" />
                    <p className="text-md">published 21/09/2021</p>
                </div>
            </div>
        </Container>
    )
}

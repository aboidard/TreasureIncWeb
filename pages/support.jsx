import Chest from '@/app/components/Chest'
import Container from '@/components/Container'

export default function ChestPage() {
    return (
        <Container title="Support">
            <br />
            <div className="border-solid border-4 flex flex-col justify-center items-center m-auto p-8 xl:w-1/2 lg:w-3/4 md:w-2/3 sm:w-5/6">
                <p className="text-center text-white w-auto">
                    First, please check out the Treasure Inc. FAQ (comming soon) your question may have already been answered<br /><br />

                    If you are still experiencing technical issues, send an email at <a id="support" href="mailto://support@treasure-inc.fr">support@treasure-inc.fr</a><br /><br />

                    For general message or request of any kind, please email <a id="support" href="mailto://contact@treasure-inc.fr">contact@treasure-inc.fr</a><br />

                </p>
            </div>
        </Container>
    )
}

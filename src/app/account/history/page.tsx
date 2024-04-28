import { getServerAuthSession } from "~/server/auth";
import RentalHistory from '../../_components/rental_history';

export default async function AccountHistory() {
    const session = await getServerAuthSession();

    return <main>
        <div className=" flex flex-col gap-16">
            <h2 className=" text-primary pt-7">
                Rental History
            </h2>
            {session ? < RentalHistory /> : <h3 className=' text-center'>Uh oh, you need to sign in first!</h3>}
        </div>
    </main>
}
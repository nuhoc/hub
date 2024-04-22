import SearchGear from '../_components/search_gear';
import { getServerAuthSession } from "~/server/auth";

export default async function Rent() {
    const session = await getServerAuthSession();

    return <main>
        <div className=" flex flex-col gap-16">
            <h2 className=" text-primary pt-7">
                Gear Rentals
            </h2>
            {session ? < SearchGear /> : <h3 className=' text-center'>Uh oh, you need to sign in first!</h3>}
        </div>
    </main>
}
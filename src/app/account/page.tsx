import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import Barcode from '../_components/barcode';
import { PrismaClient } from '@prisma/client'
import { now } from "next-auth/client/_utils";

export default async function Account() {
    const prisma = new PrismaClient()
    const session = await getServerAuthSession();
    const dayPassesLeft = 3; // TODO: Connect some sort of API to get accurate count

    const expiration = await prisma.membership.findFirst({
        where: {
            userId: session?.user.id,
            expiresAt: {
                gte: new Date(now())
            }
        },
        select: { expiresAt: true }
    })

    return <main className=" sm:pt-16">
        <div className=" flex flex-col gap-16">
            {session ? <div>
                <h4>
                    Welcome back, <span className=" text-primary">{`${session.user.name}!`}</span>
                </h4>
                <u className=" text-xl">{expiration ? `Member until ${expiration.expiresAt.toDateString()}` : "No Active Membership"}</u>
            </div> : <div>
                <Link href="/api/auth/signin">
                    <h4 className=" underline">
                        Oops! You need to login!
                    </h4>
                </Link>
            </div>}
            <div className=" flex flex-col gap-8 items-start">
                <div>
                    <h4>Membership Perks</h4>
                    <ul>
                        <li className=" text-xl">- Discounted MetroRock membership</li>
                        <li className=" text-xl">- Access to AllTrails Pro</li>
                        <li className=" text-xl">- RockSpot Day Passes {session ? `(${dayPassesLeft} Left)` : "(3 Total)"}</li>
                    </ul>
                </div>
                <button className=" disabled:bg-gray-500 bg-primary text-white px-8 py-3 rounded-lg" disabled><p>Renew Online (Coming Soon™)</p></button>
                <div>
                    {session && <Barcode value={session?.user.id} />}
                </div>
            </div>
        </div>
    </main>
}
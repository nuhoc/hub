import Link from 'next/link'
import NUHOCLogo from './nuhoc-logo';

export function Navbar(props: { loggedIn: boolean }) {
    return <div className="w-full h-16 shrink-0 bg-white-mountains bg-[left_bottom_30rem]">
        <div className='flex flex-row h-full justify-between items-center px-4 backdrop-blur-sm bg-black bg-opacity-25'>
            <Link href="/" className=' flex flex-row gap-4 justify-start fill-white hover:fill-primary text-white hover:text-primary'>
                <NUHOCLogo className=' w-8 h-8' />
                <h4 className=" font-shrikhand text-3xl">NUHOC</h4>
            </Link>
            <div className=" hidden sm:flex flex-row gap-4 font-raleway">
                <Link href="/" className=" text-white hover:text-primary">Home</Link>
                <Link href="/rent" className=" text-white hover:text-primary">Gear</Link>
                <Link href="/account" className=" text-white hover:text-primary">Membership</Link>
                <Link href={props.loggedIn ? "/api/auth/signout" : "/api/auth/signin"}
                    className=" text-white hover:text-primary">{props.loggedIn ? 'Logout' : 'Login'}
                </Link>
            </div>
        </div>
    </div>
}
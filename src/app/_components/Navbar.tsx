import LogoWhite from '../../../public/nuhoc-logo-white.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar(props: { loggedIn: boolean }) {
    return <div className="relative w-full h-16 ">
        <div className=' absolute -z-50 w-full h-full bg-black bg-opacity-25 bg-white-mountains bg-[left_bottom_30rem]' />
        <div className='flex flex-row h-full justify-between items-center px-4 backdrop-blur-sm'>
            <Link href="/" className=' flex flex-row gap-4 justify-start'>
                <Image src={LogoWhite} alt='NUHOC Logo' className=' w-8 h-8' />
                <h4 className=" font-shrikhand text-3xl text-white hover:text-primary">NUHOC</h4>
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
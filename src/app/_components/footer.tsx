import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return <div className="w-full shrink-0 bg-cover bg-white-mountains bg-center">
        <div className='flex flex-col w-full h-full justify-center items-center gap-2 backdrop-blur-sm bg-black bg-opacity-25 p-12'>
            <Link href="/" className=' flex flex-row gap-4 justify-start'>
                <Image src='../../../public/nuhoc-logo-green.svg' width={32} height={32} alt='NUHOC Logo' className=' w-8 h-8' />
                <h4 className=" font-shrikhand text-3xl text-white hover:text-primary">NUHOC</h4>
            </Link>
            <strong className=' text-white'>We go places</strong>
        </div>
    </div>
}
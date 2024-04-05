import Link from "next/link";

export default async function Home() {
  return <main className=" h-full flex flex-col justify-between items-center">
    <h1 className=" text-primary text-center">
      homie page
    </h1>
    <Link href={"/style"} className=" w-96 text-center text-white p-4 bg-primary rounded-full outline outline-1 outline-gray-400 hover:text-secondary">
      <button>
        Click here to see the style in action!
      </button>
    </Link>
  </main>
}

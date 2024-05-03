import { RiShoppingBag2Fill } from 'react-icons/ri';
import { FaClipboardUser } from "react-icons/fa6";
import { PowerIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";
import NavLinks from "./nav-links";

export default async function Sidebar() {
    const session = await auth()
    { JSON.stringify(session, null, 2) }

    return (
        <div className={`w-48 bottom-0 bg-cyan-900 min-h-screen p-3 pt-8 flex flex-col `}>
            <div className="flex flex-col gap-y-2 items-center">
                <div className="flex gap-x-2 items-center">
                    <RiShoppingBag2Fill
                        className={`cursor-pointer w-5 h-5 text-white duration-500 `}
                    />
                    <h1 className={`text-white origin-left font-medium text-xl duration-200 `}>
                        SHOP<span className="text-cyan-500">Select</span>
                    </h1>
                </div>
                <p className={`text-cyan-500 text-sm`}>Catalogo Web</p>
            </div>
            <ul className="pt-6 flex-grow">
                <NavLinks />
            </ul>
            <div className="flex flex-col space-y-1 mb-4 text-white">
                <a href="/dashboard/perfil/mostrar" className=" rounded-md p-2 cursor-pointer text-white hover:bg-sky-100 hover:text-blue-600 text-sm items-center gap-x-4 ">

                <p className="text-sm font-medium flex  items-center leading-none">
                    <FaClipboardUser className="w-6 h-6" />
                    {session?.user?.name}
                </p>
                </a>
            </div>

            <form action={async () => {
                'use server';
                await signOut();
            }}>
                <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-300 hover:text-red-600">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">{ }SALIR</div>
                </button>
            </form>
        </div>

    )
}
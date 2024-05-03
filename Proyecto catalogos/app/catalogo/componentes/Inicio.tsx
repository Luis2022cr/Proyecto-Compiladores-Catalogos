import Image from "next/image";
import { RiShoppingBag2Line } from "react-icons/ri";

export default function Inicio() {
    return (
        <div className="bg-cyan-700 mt-10 relative flex items-center justify-center overflow-hidden z-10">
            <div className="relative mx-auto h-full px-4  sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
                <div className="flex flex-col items-center justify-between lg:flex-row py-16">
                    <div className="relative">
                        <div className="lg:max-w-xl lg:pr-5 relative z-40">
                            <div className="bg-white flex md:5 items-center text-center bg-opacity-50 rounded-full p-2">
                                <RiShoppingBag2Line className="h-10 w-10 text-black" />
                                <p></p>
                            </div>
                            <p className="flex text-sm uppercase text-g1"></p>
                            <h1 className="mb-6 text-white max-w-lg text-5xl font-light leading-snug tracking-tight text-g1 sm:text-7xl sm:leading-snug">
                                Bienvenido!!
                            </h1>
                            <p className="text-7xl inline-block text-white bg-cyan-800 font-bold text-g4">
                                SHOP<span className="text-cyan-500">Select</span>
                            </p>
                            <p className="text-base text-gray-400">Descubre, elige y comparte tus catálogos favoritos en SHOPSelect:
                                donde encontrar y compartir productos nunca ha sido tan fácil.</p>
                            <div className="mt-10 flex flex-col items-center md:flex-row">
                                <a href="/login" className="mb-3 inline-flex items-center justify-center rounded bg-cyan-600 px-6 h-12 font-medium tracking-wide text-white shadow-md transition hover:bg-white hover:text-black focus:outline-none md:mr-4 md:mb-0 md:w-auto ml-24">
                                    Login
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className="relative ">
                            <Image
                                src="https://res.cloudinary.com/dxc3qadsk/image/upload/v1713593371/SHOP_SELECT-removebg-preview_ny3o6e.png"
                                width={800} 
                                height={800} 
                                alt="logo-shopselect"
                            />
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>

        </div>
    )
}
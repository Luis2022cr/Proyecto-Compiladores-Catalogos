//mostrarLogin
'use client'
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../botones/boton';
import { authenticate } from '@/app/database/acciones';

export default function MostrarLogin() {
    const [code, action] = useFormState(authenticate, undefined);

    return (
        <div className="h-screen flex w-full  mx-auto " >
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr bg-cyan-800 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">
                        SHOP
                        <span className="text-cyan-500">Select</span>.
                    </h1>
                    <p className="text-white mt-1">Un mundo de catálogos</p>
                    <a href="/registro" className="block w-28 bg-white text-cyan-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500">Ir a Registro</a>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white">
                <form className="bg-white" action={action}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">INICIO DE SESIÓN!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">BIENVENIDO OTRA VEZ</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                        </label >
                        <MdAlternateEmail className="h-5 w-5 text-gray-400" />
                        <input
                            className="pl-2 outline-none border-none"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Ingrese su correo electronico"
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                        </label>
                        <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                        <input
                            className="pl-2 outline-none border-none"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            required
                            minLength={6}
                        />
                    </div>

                    <LoginButton />
                    <div className="flex mt-5 h-8 items-end space-x-1">
                        {code === 'CredentialSignin' && (
                            <>
                                <p aria-live="polite" className="text-sm text-red-500">
                                    Invalid credentials
                                </p>
                            </>
                        )}
                    </div>
                    <a href="/resetPass/recuperarContra" className="block bg-white text-cyan-800  rounded-2xl font-bold transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500">
                        Olvido la contraseña, recuperela!!
                    </a>
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    return (
        <Button className="mt-16 w-full">
            Log in <RiLockPasswordLine className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}
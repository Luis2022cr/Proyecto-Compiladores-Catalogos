'use client'
import CrearRegistro from "@/app/database/acciones";
import { Button } from "../botones/boton";
import { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";

export default function CrearUsuario() {
    const [errorMessage, setErrorMessage] = useState('');

    const enviarDATA = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const password = formData.get('PASSWORD')?.toString() || '';

        // Validación de la contraseña para que sea segura 
        if (!isSecurePassword(password)) {
            setErrorMessage('La contraseña no es segura. Asegúrate de que tenga al menos 8 caracteres, una letra mayúscula, una letra minúscula y un carácter especial "!@#$%^&*".');
            return;
        }

        const result = await CrearRegistro(formData);
        // Validación de la contraseña para que sae segura 
        try {
            const response = await CrearRegistro(formData);

            if (response.error) {

                setErrorMessage(response.error);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    const isSecurePassword = (password: string): boolean => {
        // Expresión regular para verificar que la contraseña cumpla criterios de seguridad
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div className="h-full flex w-full mx-auto">
  <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-cyan-900 to-cyan-800 justify-around items-center hidden">
    <div>
      <h1 className="text-white font-bold text-4xl font-sans">
        Shop
        <span className="text-cyan-500">Select</span>.
      </h1>
      <p className="text-white mt-1">Un mundo de catálogos</p>
      <a href="/login" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500">Ir a login</a>
    </div>
    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
  </div>
  <div className="flex md:w-1/2 justify-center py-10 items-center mt-12 bg-white">
    <div className="bg-white max-w-md px-8 py-10 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <form onSubmit={enviarDATA}>
        <h1 className="text-gray-800 font-bold text-2xl mb-6">Registro</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NOMBRE">Primer nombre</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="NOMBRE"
            id="NOMBRE"
            placeholder="Primer nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="APELLIDO">Primer apellido</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="APELLIDO"
            id="APELLIDO"
            placeholder="Primer apellido"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="USERNAME">Nombre de usuario</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="USERNAME"
            id="USERNAME"
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="EMAIL">Correo electrónico</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="EMAIL"
            id="EMAIL"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PASSWORD">Contraseña</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="PASSWORD"
            id="PASSWORD"
            placeholder="Contraseña"
          />
        </div>
        <div className='mb-6'>
          <label className="block text-sm font-bold text-gray-700" htmlFor="IMAGEN">Imagen</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center items-center">
              <LuImagePlus className="mx-auto h-12 w-12 text-cyan-400" />
              <div className="items -center text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <input
                    id="IMAGEN"
                    name="IMAGEN"
                    type="file"
                  />
                </label>
              </div>
              <p className="text-xs text-white">PNG, JPG, hasta 10MB</p>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrarse</Button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  </div>
</div>

    );
}
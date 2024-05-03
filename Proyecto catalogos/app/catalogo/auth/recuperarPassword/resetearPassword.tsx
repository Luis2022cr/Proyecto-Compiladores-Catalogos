"use client"
import React, { useState } from 'react';
import { FaUnlockKeyhole } from 'react-icons/fa6';
import { Button } from '../../botones/boton';
import { resetearPassword } from '@/app/database/acciones';

export default function ResetearPage() {
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get('PASSWORD')?.toString() || '';

    // Validación de la contraseña para que sae segura 
    if (!isSecurePassword(password)) {
      setErrorMessage('La contraseña no es segura. Asegúrate de que tenga al menos 8 caracteres, una letra mayúscula, una letra minúscula y un carácter especial "!@#$%^&*".');
      return;
    }

    const result = await resetearPassword(formData);

  };

  const isSecurePassword = (password: string): boolean => {
    // Expresión regular para verificar que la contraseña cumpla criterios de seguridad
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Restablecer Contraseña</h1>
      <p className="text-slate-500">Ingrese el correo electrónico, el token y su nueva contraseña</p>

      <form onSubmit={handleSubmit} className="my-10">
        <div className="flex flex-col space-y-5">
          <label>
            <p className="font-medium text-slate-700 pb-2">Correo Electrónico</p>
            <input
              type="email"
              name="EMAIL"
              id="EMAIL"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingrese su correo electrónico"
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2 mt-2">Token</p>
            <input
              type="text"
              name="TOKEN"
              id="TOKEN"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingrese el token"
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2 mt-2">Nueva Contraseña</p>
            <input
              type="password"
              name="PASSWORD"
              id="PASSWORD"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Ingrese su nueva contraseña"
            />
          </label>

          <Button
            type="submit"
            className="w-full py-3 font-medium text-white bg-blue-600 hover:bg-cyan-500 rounded-lg border-cyan-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <FaUnlockKeyhole />
            <span>Cambiar</span>
          </Button>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

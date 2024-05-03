"use client"
import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { Button } from '../../botones/boton';
import { recuperarPassword } from '@/app/database/acciones';

export default function RecuperarPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const enviarData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await recuperarPassword(formData);

  };

  return (
    <div className="max-w-lg mx-auto my-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Recuperar Contraseña</h1>
      <p className="text-slate-500">Ingrese su correo para poder recuperar su contraseña</p>

      <form onSubmit={enviarData} className="my-10">
        <div className="flex flex-col space-y-5">
          <label>
            <p className="font-medium text-slate-700 pb-2">Correo Electrónico</p>
            <input
              type="email"
              name="EMAIL"
              id="EMAIL"
              placeholder="Ingrese su correo"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </label>

          <Button
            type="submit"
            className="w-full py-3 font-medium text-white bg-blue-600 hover:bg-cyan-500 rounded-lg border-cyan-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <FaKey />
            <span>Recuperar</span>
          </Button>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

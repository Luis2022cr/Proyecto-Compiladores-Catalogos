import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { CiShoppingTag } from 'react-icons/ci';
import Image from 'next/image';
import { fetchCatalogo } from '@/app/database/consultas';
import { Catalogo } from '../../interfaces/interfaces';
import { EnviarCatalogoId } from '../../botones/boton';

export default async function MostrarCatalogos() {

  const catalogo: Catalogo[] = await fetchCatalogo();

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl uppercase font-bold p-4 text-white mb-8 text-center">Catálogos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalogo.map((data) => (
            <div key={data.ID} className="bg-cyan-700 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105 border-4 border-cyan-400">
              <Image
                className="w-full h-72 object-cover"
                key={data.ID}
                src={data.IMAGEN}
                alt={data.NOMBRE}
                width={350}
                height={350}
                priority={false}
              />
              <div className="px-4 py-2">
                <h1 className="text-xl font-gray-700 font-bold text-center">{data.NOMBRE}</h1>
                <div className="flex space-x-2 mt-2">
                  <RiShoppingBag2Fill className="h-7 w-7 text-cyan-400" />
                  <h3 className="text-lg text-white font-semibold mb-2">{data.CATEGORIA_NOMBRE}</h3>
                </div>
                <div className="flex space-x-2">
                  <IoPersonCircle className="h-7 w-7 text-cyan-400" />
                  <h3 className="text-lg text-white font-semibold mb-2">{data.USUARIO_NOMBRE}</h3>
                </div>
                <div className="flex space-x-2">
                  <CiShoppingTag className="h-7 w-7 text-cyan-400" />
                  <h3 className="text-lg text-white font-semibold mb-2">{data.CATEGORIA_NOMBRE}</h3>
                </div>
                <div className="flex-grow flex flex-col px-2 py-1">
                  <p className="text-sm tracking-normal text-white flex-grow">{data.DESCRIPCION}</p>
                  <div>
                    <EnviarCatalogoId id={data.ID} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

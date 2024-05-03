import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { CiShoppingTag } from 'react-icons/ci';
import Image from 'next/image';
import { fetchCatalogo } from '@/app/database/consultas';
import { Catalogo } from '../../interfaces/interfaces';
import Inicio from '../Inicio';
import { EnviarCatalogoProducId } from '../../botones/boton';

export default async function MostrarCatalogosProduc() {

  const catalogo: Catalogo[] = await fetchCatalogo();

  return (
    <div>

      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-6xl w-full">
          <Inicio />
          <h3 className='text-white mt-5 text-center text-4xl'>Catalogos</h3>
          <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {catalogo.map((data) => (
              <div key={data.ID} className="bg-cyan-900 text-white mb-5 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition border-4 border-cyan-400 duration-500 hover:scale-105 max-w-xs flex flex-col">
                <div>
                  <Image
                    className="w-full h-48 object-contain"
                    key={data.ID}
                    src={data.IMAGEN}
                    alt={data.NOMBRE}
                    width={200}
                    height={200}
                    priority={false}
                  />
                  <div className='mt-1'>
                    <h2 className="text-lg font-gray-700 font-bold text-center">{data.NOMBRE}</h2>
                  </div>
                  <div className="px-2 py-1 flex flex-col ">
                    <div className="flex space-x-1 mt-3">
                      <RiShoppingBag2Fill className="h-7 w-7 text-cyan-400" />
                      <h3 className="text-sm text-white  font-medium flex  items-center">{data.CATEGORIA_NOMBRE}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <IoPersonCircle className="h-7 w-7 text-cyan-400" />
                      <h3 className="text-sm text-white  font-medium flex  items-center">{data.USUARIO_NOMBRE}</h3>
                    </div>
                    <div className="flex space-x-1">
                      <CiShoppingTag className="h-7 w-7 text-cyan-400" />
                      <h3 className="text-sm text-white  font-medium flex  items-center">{data.CATEGORIA_NOMBRE}</h3>
                    </div>
                  </div>

                </div>
                <div className="flex-grow flex flex-col px-2 py-1">
                  <p className="text-sm tracking-normal flex-grow">{data.DESCRIPCION}</p>
                  <div>
                    <EnviarCatalogoProducId id={data.ID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                Creado por <a href="" className="text-blueGray-500 hover:text-gray-800" target="_blank">JLCR</a> by <a href="" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Next</a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>


  );
};


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Usuario } from '../interfaces/interfaces';
import { fetchUsuarioPorId } from '@/app/database/consultas';

export default async function MostrarUnUsuariopage() {
  const usuario: Usuario | null = await fetchUsuarioPorId();

  return (
    <section className="relative">
      <div className="container mx-auto">
        <div className="relative flex flex-col min-w-0 break-words text-white bg-cyan-700 w-full shadow-xl rounded-lg">
          <div className="">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 lg:order-2 flex justify-center">
              </div>
              <div className="px-12 lg:order-3 lg:text-right lg:self-center">
                <div className="py-6 px-3 mt-10 sm:mt-0">
                  <a href='/dashboard/catalogos/crear' className="bg-cyan-500 hover:bg-cyan-800 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-2 ease-linear transition-all duration-150 block w-full lg:w-auto">
                    Crear Catálogo
                  </a>
                  {/*<a href='/dashboard/perfil/catalogo' className="bg-cyan-500 hover:bg-cyan-800 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-0 ease-linear transition-all duration-150 block w-full lg:w-auto">
                    Mis Catálogos
                  </a>*/}
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {usuario.TOTALCATALOGOS}
                    </span>
                    <span className="text-sm text-blueGray-400">catalogos</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {usuario.TOTALPRODUCTOS}
                    </span>
                    <span className="text-sm text-blueGray-400">Productos</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex justify-center mt-6">
              <div className="flex items-center mb-5">
                <div>
                  <Image
                    src={usuario.IMAGEN}
                    alt="nombre"
                    width={450}
                    height={450}
                    className="rounded-full h-40 w-40 object-cover"
                  />
                </div>
                <div className="ml-8">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {usuario.NOMBRE} {usuario.APELLIDO}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {usuario.EMAIL}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-4">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{usuario.TIPO_DE_USUARIO}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400">username: </i>{usuario.USERNAME}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
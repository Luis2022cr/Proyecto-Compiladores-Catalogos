
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarUnUsuariopage from '@/app/catalogo/componentes/MostrarUnUsuario';
import MostrarMisCatalogos from '@/app/catalogo/componentes/mostrarCatalogos/MostrarMisCatalogos';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "ShopSelect - Perfil",
    description: "pagina de perfil",
  };
  
export default async function PerfilPage() {

  return (
      <div>
        <Suspense fallback={<Cargando />}>
          <MostrarUnUsuariopage />
          <MostrarMisCatalogos />
        </Suspense>
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-white font-semibold py-1">
                  Creado por <a href="" className="text-blueGray-500 hover:text-gray-800" target="_blank">JL</a> by <a href="" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Next</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}

import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Cargando from '../catalogo/botones/cargando';
import MostrarCatalogosProduc from '../catalogo/componentes/mostrarCatalogos/MostrarCatalogosProduc';
import Nav from '../diseño/dashboard/nav';

export const metadata: Metadata = {
    title: "ShopSelect - Inicio",
    description: "pagina de inicio",
  };
  
export default async function CatalogoPage() {

  return (
      <div>
        <Suspense fallback={<Cargando/>}>
          <Nav/>
          <MostrarCatalogosProduc />
        </Suspense>
      </div>
  );
}

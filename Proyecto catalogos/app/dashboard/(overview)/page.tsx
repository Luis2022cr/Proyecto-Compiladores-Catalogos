
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarCatalogos from '@/app/catalogo/componentes/mostrarCatalogos/MostrarCatalogos';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "ShopSelect - Inicio",
    description: "pagina de inicio",
  };
  
export default async function CatalogoPage() {

  return (
      <div>
        <Suspense fallback={<Cargando />}>
          <MostrarCatalogos />
        </Suspense>
      </div>
  );
}

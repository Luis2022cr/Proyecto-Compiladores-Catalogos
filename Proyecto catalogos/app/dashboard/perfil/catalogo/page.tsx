
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarUnUsuariopage from '@/app/catalogo/componentes/MostrarUnUsuario';
import MostrarMisCatalogos from '@/app/catalogo/componentes/mostrarCatalogos/MostrarMisCatalogos';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "ShopSelect - Mis Catalogos",
    description: "pagina de mis catalogos",
  };
  
export default async function PerfilPage() {

  return (
      <div>
        <Suspense fallback={<Cargando />}>
          <MostrarMisCatalogos />
        </Suspense>
      </div>
  );
}

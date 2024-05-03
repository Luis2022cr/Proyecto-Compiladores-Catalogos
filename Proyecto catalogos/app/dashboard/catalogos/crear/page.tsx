
import Cargando from '@/app/catalogo/botones/cargando';
import CrearCatalogo from '@/app/catalogo/componentes/creacion/crearCatalogo';
import { fetchCategorias } from '@/app/database/consultas';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "ShopSelect - Crear Catalogo",
    description: "pagina de crear catalogos",
  };
  
export default async function CrearCatalogoPage() {
  const categorias = await fetchCategorias();
 
  return (
      <div>
        <Suspense fallback={<Cargando />}>
          <CrearCatalogo categorias={categorias} />
        </Suspense>
      </div>
  );
}

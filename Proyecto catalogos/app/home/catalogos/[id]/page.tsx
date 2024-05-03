
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarCatalogosCatIdHome from '@/app/catalogo/componentes/mostrarCatalogos/MostrarCatalogosCategoriaIdHome';
import { Catalogo } from '@/app/catalogo/interfaces/interfaces';
import { fetchCatalogoCatId } from '@/app/database/consultas';
import Nav from '@/app/diseño/dashboard/nav';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Productos",
  description: "Página de inicio",
};

export default async function CatalogoCategoriaPage({ params }: { params: { id: number} }) {
  
  const CATEGORIA_ID = params.id;
  const catalogo: Catalogo[] = await fetchCatalogoCatId(CATEGORIA_ID);
    
  return (
    <div>
       <Suspense fallback={<Cargando />}>
            <div className='mb-12'>

            <Nav />
            </div>
            <MostrarCatalogosCatIdHome catalogo={catalogo} />
        </Suspense>
    </div>
  );
}
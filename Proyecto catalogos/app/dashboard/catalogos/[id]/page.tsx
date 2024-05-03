
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarProductosPage from '@/app/catalogo/componentes/MostrarProductos';
import MostrarCatalogosCatId from '@/app/catalogo/componentes/mostrarCatalogos/MostrarCatalogosCategoriaID';
import { Catalogo, Producto } from '@/app/catalogo/interfaces/interfaces';
import { fetchCatalogoCatId, fetchProductos } from '@/app/database/consultas';
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
          <MostrarCatalogosCatId catalogo={catalogo} />
        </Suspense>
    </div>
  );
}
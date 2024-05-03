
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarProductosPage from '@/app/catalogo/componentes/MostrarProductos';
import ActualizarCatalogo from '@/app/catalogo/componentes/actualizacion/actualizarCatalogo';
import { Catalogo, Categoria, Producto } from '@/app/catalogo/interfaces/interfaces';
import { actualizarCatalogoCatalogo } from '@/app/database/acciones';
import { fetchCatalogoCatalogoId, fetchCatalogoPorUserId, fetchCategorias, fetchProductos } from '@/app/database/consultas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Productos",
  description: "Página de inicio",
};

export default async function EditarCatalogoPage({ params }: { params: { id: number} }) {
  
    const CATALOGO_ID = params.id;
    const [catalogo, categorias] : [Catalogo | undefined , Categoria[] | undefined] = await Promise.all([
        fetchCatalogoCatalogoId(CATALOGO_ID),
        fetchCategorias(),
      ]);

    if (!catalogo) {
        notFound();
    }

  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <ActualizarCatalogo catalogo={catalogo!} categorias={categorias}/>
      </Suspense>
    </div>
  );
}
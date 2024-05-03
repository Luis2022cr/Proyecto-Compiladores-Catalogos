
import Cargando from '@/app/catalogo/botones/cargando';
import ActualizarCatalogo from '@/app/catalogo/componentes/actualizacion/actualizarCatalogo';
import EditarProducto from '@/app/catalogo/componentes/actualizacion/actualizarProducto';
import { Catalogo, Categoria, Producto } from '@/app/catalogo/interfaces/interfaces';
import { fetchCatalogoCatalogoId, fetchCatalogoPorUserId, fetchCategorias, fetchProductoId, fetchProductos } from '@/app/database/consultas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Productos",
  description: "Página de editar producto",
};

export default async function EditarCatalogoPage({ params }: { params: { id: number} }) {
  
    const id = params.id;
    const [ producto ]: [Producto | undefined ]= await Promise.all([fetchProductoId(id)]);


  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <EditarProducto producto={producto!} />
      </Suspense>
    </div>
  );
}
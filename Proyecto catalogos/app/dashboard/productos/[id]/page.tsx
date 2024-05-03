
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarProductosPage from '@/app/catalogo/componentes/MostrarProductos';
import { Producto } from '@/app/catalogo/interfaces/interfaces';
import { fetchProductos } from '@/app/database/consultas';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Productos",
  description: "Página de inicio",
};

export default async function ProductoPage({ params }: { params: { id: number} }) {
  
  const CATALOGO_ID = params.id;
  const productos: Producto[] = await fetchProductos(CATALOGO_ID);
    
  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <MostrarProductosPage  productos={productos}/>
      </Suspense>
    </div>
  );
}
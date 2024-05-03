
import Cargando from '@/app/catalogo/botones/cargando';
import CrearProducto from '@/app/catalogo/componentes/creacion/crearProducto';
import { Producto } from '@/app/catalogo/interfaces/interfaces';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: "ShopSelect - Crear Porducto",
    description: "pagina de crear producto",
  };
  
  export default function CrearProductoPage({ params }: { params: { id: number} }) {
    const id = params.id;
    const producto: Producto[] = [];
    
    return (
      <div>
        <Suspense fallback={<Cargando />}>
          <CrearProducto producto={producto} catalogoId={id} />
        </Suspense>
      </div>
    );
  }
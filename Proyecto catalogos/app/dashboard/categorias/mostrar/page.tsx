
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarCategorias from '@/app/catalogo/componentes/MostrarCategorias';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Categorias",
  description: "pagina de categorias",
};

export default async function CategoriaPage() {
  
  return (
    <div>
       <Suspense fallback={<Cargando />}>
        <MostrarCategorias />
      </Suspense>
    </div>
  );
}
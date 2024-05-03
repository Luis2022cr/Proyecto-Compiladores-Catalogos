
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarCategoriasHome from '@/app/catalogo/componentes/mostrarCategorias/MostrarCategoriasHome';
import Nav from '@/app/diseño/dashboard/nav';
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
        <Nav />
        <MostrarCategoriasHome />
      </Suspense>
    </div>
  );
}
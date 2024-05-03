
import Cargando from '@/app/catalogo/botones/cargando';
import MostrarUsuariospage from '@/app/catalogo/componentes/MostrarUsuarios';
import { Usuario } from '@/app/catalogo/interfaces/interfaces';
import { fetchUsuarios } from '@/app/database/consultas';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Usuarios",
  description: "Página de usuarios",
};

export default async function UsuariosPage() {
  
    const usuarios: Usuario[] = await fetchUsuarios();
    
  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <MostrarUsuariospage  usuarios={usuarios}/>
      </Suspense>
    </div>
  );
}
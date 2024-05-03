
import RecuperarPage from '@/app/catalogo/auth/recuperarPassword/recuperarPassword';
import Cargando from '@/app/catalogo/botones/cargando';
import Nav from '@/app/diseño/dashboard/nav';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Usuarios",
  description: "Página de usuarios",
};

export default async function RecuperarPasswordPage() {
     
  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <Nav />
        <RecuperarPage  />
      </Suspense>
    </div>
  );
}
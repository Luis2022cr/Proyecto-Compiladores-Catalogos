
import ResetearPage from '@/app/catalogo/auth/recuperarPassword/resetearPassword';
import Cargando from '@/app/catalogo/botones/cargando';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopSelect - Usuarios",
  description: "Página de usuarios",
};

export default async function ResetearPasswordPage() {
  
  return (
    <div>
      <Suspense fallback={<Cargando />}>
        <ResetearPage />
      </Suspense>
    </div>
  );
}
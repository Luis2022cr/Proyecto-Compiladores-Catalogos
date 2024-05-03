import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Producto } from '../../interfaces/interfaces';
import { EditarProducto } from '../../botones/boton';
import { BorrarProducto } from '../../botones/botones-borrar';


export default async function MostrarMisProductosPage ({
  productos,
}: {
  productos: Producto[];
}) {
  
  // Objeto de mapeo de colores a clases de Tailwind CSS
  const colorClasses: { [key: string]: string } = {
    rojo: "bg-red-500",
    azul: "bg-blue-500",
    verde: "bg-green-500",
    gris: "bg-gray-500",
    amarillo: "bg-yellow-500",
    naranja: "bg-orange-500",
    morado: "bg-purple-500",
  };
  
  const colorClasses2: { [key: string]: string } = {
    rojo: "#853A3A",
    azul: "#364FCB",
    verde: "#32A23A",
    gris: "#555755",
    amarillo: "#FCD34D",
    naranja: "#FFA500",
    morado: "#8A2BE2",
  };



  return (
    <div className="p-6 container mx-auto rounded-xl">
    <h1 className="text-4xl uppercase font-bold from-current text-white text-center">Productos</h1>
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5 justify-center">
      {productos.map((data) => {
        const colorClass = colorClasses[data.COLOR] || "bg-gray-500";
        const colorClass2 = colorClasses2[data.COLOR] || "bg-gray-500";
  
        return (
          <div key={data.ID} className={`m-3 h-auto relative overflow-hidden ${colorClass} rounded-lg hover:shadow-xl transform transition duration-500 hover:scale-105`}>
            <svg className="absolute bottom-0  mb-48" viewBox="0 0 375 283" fill="none">
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill={`${colorClass2}` || "#8B0000"} />
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill={`${colorClass2}` || "#8B0000"} />
            </svg>
            <div className="relative pt-10 px-10 flex items-center justify-center hover:shadow-xl transform transition duration-500 hover:scale-150">
              <div className="block absolute bottom-0 left-0 -mb-24 ml-3 "></div>
              <Image
                className="relative w-42 m-4"
                key={data.ID}
                src={data.IMAGEN}
                width={250}
                height={250}
                alt={data.NOMBRE}
              />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">{data.DESCRIPCION}</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">{data.NOMBRE}</span>
                <span className=" bg-white rounded-full text-black text-xs font-bold px-3 py-2 leading-none flex items-center">{data.PRECIO} Lps.</span>
              </div>
              <div className=" flex-col items-center mt-3">
                <EditarProducto id={data.ID} />
                <BorrarProducto id={data.ID} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  
  );
};


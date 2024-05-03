
import React, { useState, useEffect } from 'react';
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdNumbers } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Usuario } from '../interfaces/interfaces';

export default async function MostrarUsuariospage({
  usuarios,
}: {
  usuarios: Usuario[];
}) {

  return (
    <div className="min-h-screen flex roundex-full justify-center items-center py-5 max-w-6xl p-4 mx-auto">
      <div className="container">
        <h1 className="text-4xl uppercase font-bold mb-8 text-white text-center">Usuarios</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {usuarios.map((data) => (
            <div key={data.ID} className="bg-white mb-4">
            <div className="bg-cyan-500 rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-cyan-600 border-b">
                  <IoPersonCircleOutline className="logo-usuario" />
                  <p className="pt-2 text-lg font-semibold text-gray-50">{data.NOMBRE} {data.APELLIDO}</p>
                  <p className="text-sm text-gray-100">{data.EMAIL}</p>
                  <div className="mt-5">
                    <a href='#' className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
                      Editar Informacion
                    </a>
                  </div>
                </div>
              
                <div className="w-full bg-white hover:bg-gray-400 hover:shadow-xl transition duration-500 hover:scale-105 flex">
                  <div className="flex items-center ">
                      <MdNumbers  className="h-5 w-5 m-5"/>
                      <h4> {data.ID} </h4>
                  </div>
                </div>

                <div  className="w-full  bg-white  hover:bg-gray-400 hover:shadow-xl transition duration-500 hover:scale-105 flex">
                  <div className="flex items-center ">
                      <BsPersonBoundingBox  className="h-5 w-5 m-5"/>
                      <h4> {data.USERNAME} </h4>
                  </div>
                </div>

                <div  className="w-full  bg-white hover:bg-gray-400 hover:shadow-xl transition duration-500 hover:scale-105 flex">
                  <div className="flex items-center ">
                      <BsPersonVcard   className="h-5 w-5 m-5"/>
                      <h4> {data.TIPO_DE_USUARIO} </h4>
                  </div>
                </div>

            </div>
          </div>
          ))}
        </div>
      </div>
    </div>

  );
}

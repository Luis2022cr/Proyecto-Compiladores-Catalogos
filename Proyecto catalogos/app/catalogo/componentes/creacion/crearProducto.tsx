'use client';

import { LuImagePlus } from 'react-icons/lu';
import { Producto } from '../../interfaces/interfaces';
import { crearProducto } from '@/app/database/acciones';
import { Button } from '../../botones/boton';
import { useState } from 'react';

export default function CrearProducto({
    producto,
    catalogoId,
}: {
    producto: Producto[];
    catalogoId: number;
}) {
    const [errorMessage, setErrorMessage] = useState('');

    const EnviarData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await crearProducto(catalogoId, formData);
      if (response.error) {

        setErrorMessage(response.error);
    }
    } catch (error) {
      console.error('Error al actualizar el catálogo:', error);
      setErrorMessage('Error al crear el Producto. "TODOS LOS CAMPOS SON NECESARIOS", inténtelo de nuevo.');
    }
  };
   

    return (
        <div className="max-w-6xl p-6 mx-auto rounded-md  bg-cyan-900 mt-7">
            <h1 className="text-4xl uppercase font-bold text-white from-current mb-8 text-center mt-5">Crear producto</h1>
            <section >
                <form onSubmit={EnviarData}>
                    <div className="grid text-cyan-400 grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

                        {/* NOMBRE */}
                        <div>

                            <div >
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="NOMBRE"
                                    name="NOMBRE"
                                    placeholder="ingrese el nombre del catalogo"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-cyan-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            
                        </div>
                        {/* PRECIO */}
                        <div>
                            <div >
                                <label htmlFor="PRECIO">Precio</label>
                                <input
                                    type="number"
                                    id="PRECIO"
                                    name="PRECIO"
                                    placeholder="ingrese el precio del producto"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-cyan-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                 
                        </div>
                        {/* COLOR */}
                        <div>

                            <div>
                                <label htmlFor="COLOR">Color de la tarjeta</label>
                                <select
                                    id="COLOR"
                                    name="COLOR"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-cyan-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                    <option value="rojo">Rojo 🔴</option>
                                    <option value="azul">Azul 🔵</option>
                                    <option value="verde">Verde 🟢</option>
                                    <option value="gris">Gris </option>
                                    <option value="amarillo" >Amarillo 🟡</option>
                                    <option value="naranja" >Naranja 🟠</option>
                                    <option value="morado" >Morado 🟣</option>
                                </select>
                            </div>
                            
                        </div>
                       
                        {/* DESCRIPCION */}
                        <div>

                            <div className='mt-10'>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id="DESCRIPCION"
                                    name="DESCRIPCION"
                                    placeholder="Descripcion"
                                    className="field-sizing:content  block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                           
                        </div>

                        {/* IMAGEN */}

                        <div className='mt-10'>
                            <label className="block text-sm font-mediumit">Imagen</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center items-center">
                                    <LuImagePlus className="mx-auto h-12 w-12 text-cyan-400" />
                                    <div className="items -center text-sm  text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">

                                            <input
                                                id="IMAGEN"
                                                name="IMAGEN"
                                                type="file"
                                            />

                                        </label>
                                    </div>
                                    <p className="text-xs text-white">PNG, JPG, up to 10MB</p>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                    <div className='flex justify-self-end'>

                        <Button type="submit">Crear producto</Button>
                    </div>
                </form>
            </section>
        </div>
    );
}

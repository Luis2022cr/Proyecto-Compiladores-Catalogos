'use client';
import { Categoria, Catalogo } from '../../interfaces/interfaces';
import { useFormState } from 'react-dom';
import { actualizarCatalogoCatalogo } from '@/app/database/acciones';
import { Button } from '../../botones/boton';
import Image from 'next/image';
import { useState } from 'react';

export default function ActualizarCatalogo({
    catalogo,
    categorias,
  }: {
    catalogo: Catalogo;
    categorias: Categoria[];
  }) {
    const [errorMessage, setErrorMessage] = useState('');

    const EnviarData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    // Lógica de actualización de catálogo
    try {
      const response = await actualizarCatalogoCatalogo(catalogo.ID, formData);
      if (response.error) {

        setErrorMessage(response.error);
    }
    } catch (error) {
      console.error('Error al actualizar el catálogo:', error);
      setErrorMessage('Error al actualizar el catálogo. "TODOS LOS CAMPOS SON NECESARIOS", inténtelo de nuevo.');
    }
  };
   
    return (
        <div className="max-w-6xl p-6 mx-auto rounded-md  bg-cyan-900 mt-7">
            <h1 className="text-4xl uppercase font-bold text-white from-current mb-8 text-center mt-5">Crear catálogos</h1>
            <p className="text-white  mt-5">Esta editando el catalogo = {catalogo.NOMBRE}, con codigo = {catalogo.ID}</p>
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
                                    defaultValue={catalogo.NOMBRE}
                                    placeholder="ingrese el nombre del catalogo"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-cyan-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                          
                        </div>

                        {/* CATEGORIA */}
                        
                        <div>

                            <div>
                                <label htmlFor="categoria">Categoría</label>
                                <select
                                    id="CATEGORIA_ID"
                                    name="CATEGORIA_ID"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-cyan-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                    defaultValue={catalogo.CATEGORIA_ID}
                                    aria-describedby="customer-error"
                                >
                                    <option value="" disabled>
                                        Seleccione Categoria
                                    </option>
                                    {categorias.map((data) => (
                                        <option key={data.ID} value={data.ID}>
                                            {data.NOMBRE}
                                        </option>
                                    ))}
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
                                    defaultValue={catalogo.DESCRIPCION}
                                    className="field-sizing:content  block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            
                        </div>

                        {/* IMAGEN */}

                        <div className='mt-10'>
                            <label className="block text-sm font-mediumit">Imagen</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center items-center">
                                    <h2>Imagen anterior</h2>
                                    <Image
                                        src={catalogo.IMAGEN} 
                                        alt="Imagen del catálogo" 
                                        className="mx-auto" 
                                        width={150}
                                        height={140}
                                        />

                                        <h2>Nueva imagen</h2>
                                    <div className="items -center text-sm  text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            
                                            <input
                                                id="IMAGEN"
                                                name="IMAGEN"
                                                type="file"
                                            />
                                                
                                        </label>
                                    </div>
                                    <p className="text-xs text-red-500 uppercase">La imagen debe actualizarse</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                    <div className='flex justify-self-end'>

                        <Button type="submit">Editar Catalogo</Button>
                    </div>
                </form>
            </section>
        </div>
    );
}

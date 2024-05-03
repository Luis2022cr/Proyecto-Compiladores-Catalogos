'use client'
import { borrarCatalogo, borrarProducto } from "@/app/database/acciones";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";


//Funcion para borrar catalogos
export function BorrarCatalogos({ id }: { id: number }) {
    const borrarCatalogoId = borrarCatalogo.bind(null, id);
    const [confirmDelete, confirmarBorrar] = useState(false);
  
    const handleDelete = () => {
      if (confirmDelete) {
        borrarCatalogoId();
      } else {
        confirmarBorrar(true);
      }
    };
  
    const handleCancelDelete = () => {
        confirmarBorrar(false);
    };
  
    return (
      <div>
        {confirmDelete ? (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-cyan-800 p-4 rounded-md shadow-md">
              <p>¿Estás seguro de que deseas borrar este catálogo?</p>
              <div className="mt-4 flex justify-center">
                <button
                  className="mr-4 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    borrarCatalogoId();
                    confirmarBorrar(false);
                  }}
                >
                  Sí, Borrar
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleDelete}
            className="mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-red-800 flex items-center justify-center"
          >
            <MdDeleteForever className="w-7 h-7 mr-2" />
            <span>Borrar Catalogo</span>
          </button>
        )}
      </div>
    );
  }
  
  
//Funcion para borrar productos
export function BorrarProducto({ id }: { id: number }) {
  const borrarProductoId = borrarProducto.bind(null, id);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      borrarProductoId();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div>
      {confirmDelete ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-cyan-800 p-4 rounded-md shadow-md">
            <p>¿Estás seguro de que deseas borrar este producto?</p>
            <div className="mt-4 flex justify-center">
              <button
                className="mr-4 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Sí, Borrar
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleDelete}
          className="mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-red-800 flex items-center justify-center"
        >
          <MdDeleteForever className="w-7 h-7 mr-2" />
          <span>Borrar Producto</span>
        </button>
      )}
    </div>
  );
}
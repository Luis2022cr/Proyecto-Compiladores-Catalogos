
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { GrUpdate } from "react-icons/gr";

//ENVIAR ID PARA VER CATALOGOS POR CATEGORIA_ID
export function EnviarCategoriaId({ id }: { id: number }) {

  return (
    <Link
      href={`/dashboard/catalogos/${id}`}
      className="block mt-4 w-full text-center bg-cyan-400 py-2 rounded-lg cursor-pointer text-white"
    >
      ver catalogos
    </Link>
  );
}

//ENVIAR ID PARA VER CATALOGOS POR CATEGORIA_ID EN HOME
export function EnviarCategoriaIdHome({ id }: { id: number }) {

  return (
    <Link
      href={`/home/catalogos/${id}`}
      className="block mt-4 w-full text-center bg-cyan-400 py-2 rounded-lg cursor-pointer text-white"
    >
      ver productos
    </Link>
  );
}

//ENVIAR ID PARA VER PRODUCTOS POR CATALOGO_ID (una ves logeado)
export function EnviarCatalogoId({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/productos/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <VscOpenPreview className="w-7 h-7 mr-2" />
      <span>Ver productos</span>
    </Link>
  );
}

//VerMisProductos (enviar ID del catalogo)
export function VerMisProductos({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/productos/misProductos/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <VscOpenPreview className="w-7 h-7 mr-2" />
      <span>Ver productos</span>
    </Link>
  );
}

//ENVIAR ID PARA VER PRODUCTOS POR CATALOGO_ID (una ves logeado)
export function EnviarCatalogoIdHome({ id }: { id: number }) {
  return (
    <Link
      href={`/home/produc/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <VscOpenPreview className="w-7 h-7 mr-2" />
      <span>Ver productos</span>
    </Link>
  );
}

export function CrearProducto({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/productos/crear/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <HiOutlinePencilSquare className="w-7 h-7 mr-2" />
      <span>crear productos</span>
    </Link>
  );
}

//enviar id de producto para editar
export function EditarProducto({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/productos/editar/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <HiOutlinePencilSquare className="w-7 h-7 mr-2" />
      <span>Editar productos</span>
    </Link>
  );
}


export function ActualizarCatalogo({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/catalogos/editar/${id}`}
      className=" mt-2 w-full text-center bg-cyan-500 py-1 rounded-lg cursor-pointer text-white hover:bg-cyan-800 flex items-center justify-center"
    >
      <GrUpdate className="w-7 h-7 mr-2" />
      <span>Editar Catalogo</span>
    </Link>
  );
}


//ENVIAR ID PARA VER PRODUCTOS POR CATALOGO_ID (sin estar logeado)
export function EnviarCatalogoProducId({ id }: { id: number }) {

  return (
    <Link
      href={`/home/produc/${id}`}
      className="block mt-4 w-full text-center bg-cyan-400 py-2 rounded-lg cursor-pointer text-white"
    >
      ver productos
    </Link>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        'flex justify-self-end mt-10 h-10 items-center rounded-lg bg-cyan-700 px-4 text-sm font-medium text-white transition-colors hover:bg-cyan-500 '}
    >
      {children}
    </button>
  );
}

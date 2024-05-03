import { RiShoppingBag2Fill } from 'react-icons/ri';
import Image from 'next/image';
import { Categoria } from '../interfaces/interfaces';
import { EnviarCategoriaId } from '../botones/boton';
import { fetchCategorias } from '@/app/database/consultas';

export default async function MostrarCategorias() {
  const categorias: Categoria[] = await fetchCategorias();

  return (
    <div className=" flex justify-center items-center">
      <div className="">
        <h1 className="text-4xl uppercase font-bold text-white mb-8 text-center">Categorías</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((data) => (
            <div key={data.ID} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105 border-4 border-cyan-400">
              <Image
                className="w-full h-52 object-cover"
                key={data.ID}
                src={data.IMAGEN}
                alt={data.NOMBRE}
                width={450}
                height={450}
                priority={false}
              />

              <div className="px-4 py-2">
                <h1 className="text-xl text-gray-700 font-bold text-center">{data.NOMBRE}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <RiShoppingBag2Fill className="h-7 w-7 text-cyan-400" />
                  <h3 className="text-lg text-black font-semibold">{data.ID}</h3>
                </div>
                <p className="text-sm tracking-normal text-center">{data.DESCRIPCION}</p>

                <EnviarCategoriaId id={data.ID} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

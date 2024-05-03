'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiShoppingTag } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { MdShoppingBag } from 'react-icons/md';
import { HiOutlinePencilSquare } from "react-icons/hi2";

const links = [
  { name: 'Inicio', 
    href: '/dashboard', 
    icon: <MdShoppingBag className="w-6 h-6" /> 
  },
  {
    name: 'Categorias',
    href: '/dashboard/categorias/mostrar',
    icon: <CiShoppingTag className="w-6 h-6" />,
    gap: true
  },
  { name: 'Usuarios', 
    href: '/dashboard/cuenta/usuarios', 
    icon: <FaUsers className="w-6 h-6" />
  },
  { name: 'Crear Catalogos', 
    href: '/dashboard/catalogos/crear', 
    icon: <HiOutlinePencilSquare className="w-6 h-6" />
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex rounded-md p-2 cursor-pointer text-white hover:bg-sky-100 hover:text-blue-600 text-sm items-center gap-x-4 
            ${pathname === link.href ? 'bg-cyan-600 text-blue-600' : '' }
            ${link.gap ? "mt-16" : "mt-2"}`}
          >
            {link.icon}
            <p className=" md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

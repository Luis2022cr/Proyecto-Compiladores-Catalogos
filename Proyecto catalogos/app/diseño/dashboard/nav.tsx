
import { RiShoppingBag2Fill } from "react-icons/ri";

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">

      <nav className="bg-cyan-900 border bottom-0 border-cyan-200 px-2 py-2.5 shadow">
        <div className="container flex flex-wrap justify-between bottom-0 items-center mx-auto">
          <a href="/" className="flex items-center">
            <RiShoppingBag2Fill className={`text-white cursor-pointer w-5 h-5`} />
            <h1 className={`text-white origin-left font-medium text-xl`}>
              SHOP<span className="text-cyan-500">Select</span>
            </h1>

          </a>


          <div
            className="w-full md:block md:w-auto hidden"
            id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="/home"
                  className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-cyan-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/home/categorias/"
                  className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-cyan-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Categorias
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="block py-2 pr-4 pl-3 text-white border-b border-gray-800 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-cyan-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login/Registro
                </a>
              </li>

            </ul>
          </div>

        </div>
      </nav>

    </div>
  )
}
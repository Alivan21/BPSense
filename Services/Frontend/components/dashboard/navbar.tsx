import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-scroll="true"
    >
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          {/* breadcrumb */}
          <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li className="text-sm leading-normal">
              <Link className="opacity-50 text-slate-700" href="#">
                Pages
              </Link>
            </li>
            <li
              className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
        </nav>
        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            {/* <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
              <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <i className="fas fa-search" />
              </span>
              <input
                type="text"
                className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div> */}
          </div>
          <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
            {/* online builder btn  */}
            <li className="flex items-center">
              <div className="block px-0 py-2 mr-8 text-sm font-semibold transition-all ease-nav-brand text-slate-500">
                <i className="fa fa-user sm:mr-1" />
                <span className="hidden sm:inline">Admin</span>
              </div>
            </li>
            <li className="flex items-center">
              <Link
                className="inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-blue-600 ease-soft-in hover:scale-102 text-blue-600 hover:bg-white tracking-tight-soft hover:shadow-lg active:hover:bg-white"
                href="#"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

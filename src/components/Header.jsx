import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth();

  return (
    <header className="py-5 md:py-10 bg-indigo-600">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6 lg:gap-4">
        {/* Título solo en desktop/tablet */}
        <h1 className="font-bold text-2xl md:text-2xl text-indigo-200 text-center leading-tight max-w-3xl hidden sm:block">
          Administrador de Pacientes de{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>
        {/* Título solo en mobile */}
        <h1 className="font-bold text-2xl text-indigo-200 text-center leading-tight max-w-3xl sm:hidden">
          APV
        </h1>

        <nav className="w-full lg:w-auto flex flex-row flex-wrap justify-center items-center gap-x-5 gap-y-2 sm:gap-x-6 md:gap-8">
          <Link
            to={"/admin"}
            className="text-white text-xs sm:text-sm uppercase font-bold tracking-wide"
          >
            Pacientes
          </Link>
          <Link
            to={"/admin/perfil"}
            className="text-white text-xs sm:text-sm uppercase font-bold tracking-wide"
          >
            Perfil
          </Link>

          <button
            type="button"
            className="text-white text-xs sm:text-sm uppercase font-bold cursor-pointer tracking-wide"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

const PaginaNoEncontrada = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-indigo-600">404</h1>
        <p className="mt-4 text-2xl font-bold text-gray-700">
          Página no encontrada
        </p>
        <p className="mt-2 text-gray-500">
          La ruta que intentas abrir no existe.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 bg-indigo-600 text-white font-bold uppercase px-6 py-3 rounded-xl hover:bg-indigo-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;

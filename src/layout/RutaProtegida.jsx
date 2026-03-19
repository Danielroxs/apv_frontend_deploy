import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return (
      <>
        <Header />
        <main className="container mx-auto mt-10 px-5">
          <div className="grid md:grid-cols-2 gap-6 animate-pulse">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
              <div className="h-7 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-full bg-slate-200 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
              <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
              <div className="h-10 w-40 bg-slate-200 rounded-lg mt-6"></div>
            </div>

            <div className="space-y-4">
              <div className="h-28 bg-white shadow-md rounded-xl"></div>
              <div className="h-28 bg-white shadow-md rounded-xl"></div>
              <div className="h-28 bg-white shadow-md rounded-xl"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {auth._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;

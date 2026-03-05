import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const [resetPath, setResetPath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email },
      );

      setAlerta({ msg: data.msg });
      setResetPath(typeof data?.resetPath === "string" ? data.resetPath : "");

      console.log(data);
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || "No se pudo enviar el email",
        error: true,
      });
      setResetPath("");
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} />}
          <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Enviar Instrucciones"
              className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          {resetPath && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 font-bold uppercase">
                Demo: enlace de reestablecimiento
              </p>
              <Link
                className="block mt-2 text-indigo-700 font-bold"
                to={resetPath}
              >
                Abrir enlace
              </Link>
              <p className="mt-2 text-xs text-gray-500 break-all">
                {`${window.location.origin}${resetPath}`}
              </p>
            </div>
          )}

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link className="block text-center my-5 text-gray-500" to="/">
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
            <Link
              className="block text-center my-5 text-gray-500"
              to="/registrar"
            >
              ¿No tienes una cuenta? Regístrate
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default OlvidePassword;

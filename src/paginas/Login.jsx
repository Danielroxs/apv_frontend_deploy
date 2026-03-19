import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEasyLogin, setLoadingEasyLogin] = useState(false);

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e, easyLogin = false) => {
    if (e) e.preventDefault();

    if ([email, password].includes("")) {
      if (!easyLogin) toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);

      navigate("/admin");
    } catch (error) {
      const msgApi = error.response?.data?.msg;
      const msgEntorno =
        error.response?.status === 404
          ? "API no disponible en desarrollo. Ejecuta `npm run dev:vercel` o levanta Vercel Dev en puerto 3000."
          : "No se pudo iniciar sesión";

      if (!easyLogin) toast.error(msgApi || msgEntorno);
    }
  };

  const handleEasyLogin = async () => {
    setEmail("danroxsll@gmail.com");
    setPassword("password123");
    setLoadingEasyLogin(true);
    await handleSubmit(null, true);
    setLoadingEasyLogin(false);
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl lg:text-6xl">
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-2 lg:py-10 rounded-xl bg-white">
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

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tú password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="lg:flex grid grid-cols-1 justify-center lg:justify-between items-center">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-indigo-700 w-full px-6 py-2 sm:px-4 sm:py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

            <button
              type="button"
              className="bg-indigo-700 w-full px-6 py-2 sm:px-4 sm:py-2 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              onClick={handleEasyLogin}
              disabled={loadingEasyLogin}
            >
              {loadingEasyLogin ? "Accediendo..." : "Acceso fácil"}
            </button>
          </div>
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;

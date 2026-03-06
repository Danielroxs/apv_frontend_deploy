import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [copiedField, setCopiedField] = useState("");

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedField(field);
    window.setTimeout(() => setCopiedField(""), 1200);
  };

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
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
      setAlerta({
        msg: error.response?.data?.msg || "No se pudo iniciar sesión",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

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

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <div className="mt-6 p-4 border bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 font-bold uppercase">
            Credenciales demo
          </p>
          <div className="mt-2 text-sm text-gray-700 flex items-center justify-between gap-3">
            <p>
              <span className="font-bold">Email:</span> danroxsll@gmail.com
            </p>
            <div className="flex items-center gap-2">
              {copiedField === "email" && (
                <span className="text-xs text-gray-600">Copiado</span>
              )}
              <button
                type="button"
                onClick={() => copyToClipboard("danroxsll@gmail.com", "email")}
                className="text-indigo-700 hover:text-indigo-900"
                aria-label="Copiar email demo"
                title="Copiar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1Z" />
                  <path d="M18 5H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h8v14Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-1 text-sm text-gray-700 flex items-center justify-between gap-3">
            <p>
              <span className="font-bold">Password:</span> password123
            </p>
            <div className="flex items-center gap-2">
              {copiedField === "password" && (
                <span className="text-xs text-gray-600">Copiado</span>
              )}
              <button
                type="button"
                onClick={() => copyToClipboard("password123", "password")}
                className="text-indigo-700 hover:text-indigo-900"
                aria-label="Copiar password demo"
                title="Copiar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1Z" />
                  <path d="M18 5H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h8v14Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

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

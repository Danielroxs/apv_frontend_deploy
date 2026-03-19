import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        toast.info("Coloca tu nuevo password");
        setTokenValido(true);
      } catch {
        toast.error("Hubo un error con el enlace");
      }
    };
    comprobarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Debe contener al menos 6 caracteres");
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      toast.success(data.msg);
      setPasswordModificado(true);
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "No se pudo actualizar el password",
      );
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas Acceso a{" "}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu Nuevo Password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;

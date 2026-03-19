import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();

  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some((campo) => campo === "")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (password.pwd_nuevo.length < 6) {
      toast.error("El password debe contener al menos 6 caracteres");
      return;
    }

    if (password.pwd_nuevo === password.pwd_actual) {
      toast.error("El nuevo password debe ser diferente al anterior");
      return;
    }

    const respuesta = await guardarPassword(password);

    if (respuesta?.error) {
      toast.error(respuesta.msg);
      return;
    }

    toast.success(respuesta?.msg || "Password actualizado correctamente");
  };

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Password aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="pwd_actual"
                className="uppercase font-bold text-gray-600"
              >
                Password Actual
              </label>
              <input
                id="pwd_actual"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tu password actual"
                autoComplete="current-password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="pwd_nuevo"
                className="uppercase font-bold text-gray-600"
              >
                Password Nuevo
              </label>
              <input
                id="pwd_nuevo"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nuevo"
                placeholder="Escribe tu nuevo password"
                autoComplete="new-password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;

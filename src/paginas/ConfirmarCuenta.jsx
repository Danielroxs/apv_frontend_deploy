import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { toast } from "react-toastify";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);

        // Si el token es válido y el usuario fue confirmado
        setCuentaConfirmada(true);
        toast.success(data.msg);
      } catch (error) {
        // Si el token no es válido o ya fue utilizado
        toast.error(
          error.response?.data?.msg || "Hubo un error al confirmar la cuenta",
        );
      }
    };

    confirmarCuenta();
  }, [id]);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Empieza a Administrar{" "}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;

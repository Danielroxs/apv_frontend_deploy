import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);

        // Si el token es válido y el usuario fue confirmado
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg, // Mensaje del backend
          error: false, // No es un error
        });
      } catch (error) {
        // Si el token no es válido o ya fue utilizado
        setAlerta({
          msg:
            error.response?.data?.msg || "Hubo un error al confirmar la cuenta",
          error: true, // Es un error
        });
      }

      setCargando(false); // Finalizar la carga
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
        {/* {!cargando & cuentaConfirmada ? (
          <p className="text-center text-green-600 font-bold">
            ¡Tu cuenta ha sido confirmada correctamente!
          </p>
        ) : (
          <p className="text-center text-red-600 font-bold">
            "Token no valido o ya usado"
          </p>
        )} */}
        {!cargando && <Alerta alerta={alerta} />}

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

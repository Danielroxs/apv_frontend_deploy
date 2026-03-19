import usePacientes from "../hooks/usePacientes";
import { toast } from "react-toastify";

const Paciente = ({ paciente }) => {
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;
  const { setEdicion, eliminarPaciente } = usePacientes();

  const handleEliminar = async () => {
    const respuesta = await eliminarPaciente(_id);

    if (respuesta?.cancelado) return;

    if (respuesta?.error) {
      toast.error(respuesta.msg);
      return;
    }

    toast.success(respuesta?.msg || "Paciente eliminado correctamente");
  };

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);

    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha,
    );
  };

  return (
    <div className="my-6 md:my-8 bg-white shadow-md px-4 md:px-5 py-6 md:py-8 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 my-1.5 md:my-2 text-lg md:text-base">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-1.5 md:my-2 text-lg md:text-base">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-1.5 md:my-2 text-lg md:text-base">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-1.5 md:my-2 text-lg md:text-base">
        Fecha de Alta:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>

      <p className="font-bold uppercase text-indigo-700 my-1.5 md:my-2 text-lg md:text-base">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between mt-6">
        <button
          type="button"
          className="py-2.5 px-6 sm:px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg cursor-pointer w-full sm:w-auto"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="py-2.5 px-6 sm:px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg cursor-pointer w-full sm:w-auto"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;

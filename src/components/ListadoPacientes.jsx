import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-4xl md:text-3xl text-center leading-tight">
            Listado Pacientes
          </h2>
          <p className="hidden md:block text-2xl md:text-xl mt-4 mb-6 md:mb-10 text-center leading-relaxed">
            Administra tus {""}{" "}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map(
            (paciente) =>
              paciente?._id && (
                <Paciente key={paciente._id} paciente={paciente} />
              ),
          )}
        </>
      ) : (
        <>
          <h2 className="font-black text-4xl md:text-3xl text-center leading-tight">
            No Hay Pacientes
          </h2>
          <p className="text-2xl md:text-xl mt-4 mb-6 md:mb-10 text-center leading-relaxed">
            Comienza agregando pacientes {""}{" "}
            <span className="text-indigo-600 font-bold">y apareceran aquí</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;

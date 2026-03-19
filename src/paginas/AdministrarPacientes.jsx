import { useEffect, useRef, useState } from "react";

import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import usePacientes from "../hooks/usePacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const formularioRef = useRef(null);
  const { paciente } = usePacientes();

  useEffect(() => {
    if (!paciente?._id) return;
    if (window.innerWidth >= 768) return;

    setMostrarFormulario(true);

    window.setTimeout(() => {
      formularioRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);
  }, [paciente]);

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 px-4 md:px-0 pb-10">
      <div className="md:w-1/2 lg:w-2/5">
        <button
          type="button"
          className="bg-indigo-600 text-white uppercase font-bold tracking-wide w-full p-3 rounded-lg mb-3 shadow-sm md:hidden flex items-center justify-center gap-2"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <span aria-hidden="true">👆</span>
          <span>
            {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
          </span>
        </button>
        <div
          ref={formularioRef}
          className={`${mostrarFormulario ? "block" : "hidden"} md:block`}
        >
          <Formulario />
        </div>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;

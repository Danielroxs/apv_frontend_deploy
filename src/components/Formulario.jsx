import { useState, useEffect } from "react";
import usePacientes from "../hooks/usePacientes";
import { toast } from "react-toastify";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?._id) {
      setId(paciente._id);
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha.split("T")[0]);
      setSintomas(paciente.sintomas);
      return;
    }

    setId(null);
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha(new Date().toISOString().split("T")[0]);
    setSintomas("");
  }, [paciente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const respuesta = await guardarPaciente({
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id,
    });

    if (respuesta?.error) {
      toast.error(respuesta.msg);
      return;
    }

    toast.success(respuesta?.msg || "Paciente creado correctamente");
    // setear los campos a blancos
    setNombre("");
    setPropietario("");
    setEmail("");
    setSintomas("");
    setFecha(new Date().toISOString().split("T")[0]);
    setId(null);
  };

  return (
    <>
      <div className="hidden md:block">
        <h2 className="font-black text-4xl md:text-3xl text-center leading-tight">
          Administrador Pacientes
        </h2>
        <p className="text-2xl md:text-xl mt-4 mb-6 md:mb-10 text-center leading-relaxed">
          Agrega tus Pacientes y {""}{" "}
          <span className="text-indigo-600 font-bold">Admninistralos</span>
        </p>
      </div>

      <form
        className="bg-white py-8 md:py-10 px-4 md:px-5 mb-10 lg:mb-5 shadow-md rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 md:mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm md:text-base"
          >
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="nombre de la mascota"
            className="border w-full p-3 mt-2 placeholder-gray-400 rounded-md text-base"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold text-sm md:text-base"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="nombre del propietario"
            className="border w-full p-3 mt-2 placeholder-gray-400 rounded-md text-base"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label
            htmlFor="email"
            className="text-gray-700 uppercase font-bold text-sm md:text-base"
          >
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="border-1 w-full p-3 mt-2 placeholder-gray-400 rounded-md text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold text-sm md:text-base"
          >
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border w-full p-3 mt-2 placeholder-gray-400 rounded-md text-base"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold text-sm md:text-base"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los sintomas"
            rows="5"
            cols="50"
            maxLength={500}
            minLength={20}
            name="sintomas"
            autoComplete="off"
            required
            min="20"
            className="border w-full p-3 mt-2 placeholder-gray-400 rounded-md resize-none text-base"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 md:p-3.5 text-white uppercase font-bold text-base cursor-pointer hover:bg-indigo-800 transition-colors rounded-md"
        />
      </form>
    </>
  );
};

export default Formulario;

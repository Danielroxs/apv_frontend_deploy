import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if (paciente?._id) {
      setId(paciente._id);
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha.split("T")[0]);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({ msg: "Guardado Correctamente" });
    // setear los campos a blancos
    setNombre("");
    setPropietario("");
    setEmail("");
    setSintomas("");
    setFecha("");
    setId("");
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Agrega tus Pacientes y {""}{" "}
        <span className="text-indigo-600 font-bold">Admninistralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="nombre de la mascota"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="nombre del propietario"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email Propietario
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del propietario"
            className="border-1 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
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
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;

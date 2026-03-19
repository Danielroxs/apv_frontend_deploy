import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPacientes = async () => {
      if (!auth._id) {
        setPacientes([]);
        setPaciente({});
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No hay token disponible");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { msg: "No hay token disponible", error: true };
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config,
        );

        const pacientesActualizados = pacientes.map((pacienteState) => {
          return pacienteState._id === data._id ? data : pacienteState;
        });

        setPacientes(pacientesActualizados);
        setPaciente({});
        return { msg: "Paciente editado correctamente", error: false };
      } catch (error) {
        return {
          msg: error.response?.data?.msg || "No se pudo editar el paciente",
          error: true,
        };
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config,
        );

        const {
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          __v: _v,
          ...pacienteAlmacenado
        } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
        setPaciente({});
        return { msg: "Paciente creado correctamente", error: false };
      } catch (error) {
        return {
          msg: error.response?.data?.msg || "No se pudo guardar el paciente",
          error: true,
        };
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar?");

    if (!confirmar) {
      return { cancelado: true };
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { msg: "No hay token disponible", error: true };
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await clienteAxios.delete(`/pacientes/${id}`, config);
      const pacientesActualizado = pacientes.filter(
        (pacientesState) => pacientesState._id !== id,
      );
      setPacientes(pacientesActualizado);
      if (paciente?._id === id) {
        setPaciente({});
      }
      return { msg: "Paciente eliminado correctamente", error: false };
    } catch (error) {
      return {
        msg: error.response?.data?.msg || "No se pudo eliminar el paciente",
        error: true,
      };
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;

import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const obtenerAuthInicial = () => {
  try {
    const authGuardado = localStorage.getItem("auth");
    return authGuardado ? JSON.parse(authGuardado) : {};
  } catch (error) {
    localStorage.removeItem("auth");
    return {};
  }
};

const obtenerCargandoInicial = () => {
  const token = localStorage.getItem("token");
  const authInicial = obtenerAuthInicial();

  return !(token && authInicial?._id);
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(obtenerAuthInicial);
  const [cargando, setCargando] = useState(obtenerCargandoInicial);

  useEffect(() => {
    if (auth?._id) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response?.data?.msg || "Error al autenticar");
        localStorage.removeItem("token");
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);
      setAuth(data.veterinario);

      return {
        msg: data.msg,
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);

      return { msg: data.msg };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

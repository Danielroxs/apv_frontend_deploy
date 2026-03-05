import axios from "axios";

const rawBackendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl =
  typeof rawBackendUrl === "string" ? rawBackendUrl.trim() : "";

let baseURL = "/api";
if (backendUrl && backendUrl !== "undefined" && backendUrl !== "null") {
  try {
    // new URL asegura slashes correctos: base + /api
    baseURL = new URL("/api", backendUrl).toString().replace(/\/$/, "");
  } catch {
    console.error(
      `[config/axios] VITE_BACKEND_URL no es una URL válida: ${backendUrl}. Usando baseURL=/api.`,
    );
  }
}

const clienteAxios = axios.create({
  baseURL,
});

export default clienteAxios;

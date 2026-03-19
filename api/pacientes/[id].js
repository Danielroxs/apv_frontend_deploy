import { connectDb } from "../_lib/db.js";
import Paciente from "../_models/Paciente.js";
import { getBearerToken, verifyToken } from "../_lib/auth.js";
import {
  badRequest,
  methodNotAllowed,
  notFound,
  sendJson,
  unauthorized,
} from "../_lib/res.js";

export default async function handler(req, res) {
  // Soporte para OPTIONS y CORS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return res.status(200).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  await connectDb();

  const token = getBearerToken(req);
  if (!token) return unauthorized(res);

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return unauthorized(res, "Token inválido");
  }

  const { id } = req.query || {};
  if (!id) return badRequest(res, "ID requerido");

  const paciente = await Paciente.findById(id);
  if (!paciente) return notFound(res, "Paciente no encontrado");

  if (String(paciente.veterinario) !== String(decoded.id)) {
    return unauthorized(res, "No autorizado");
  }

  if (req.method === "PUT") {
    const { nombre, propietario, email, fecha, sintomas } = req.body || {};

    paciente.nombre = nombre ?? paciente.nombre;
    paciente.propietario = propietario ?? paciente.propietario;
    paciente.email = email ?? paciente.email;
    paciente.fecha = fecha ?? paciente.fecha;
    paciente.sintomas = sintomas ?? paciente.sintomas;

    const actualizado = await paciente.save();
    return sendJson(res, 200, actualizado);
  }

  if (req.method === "DELETE") {
    await paciente.deleteOne();
    return sendJson(res, 200, { msg: "Paciente eliminado" });
  }

  return methodNotAllowed(res);
}

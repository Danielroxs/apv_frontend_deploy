import { connectDb } from "../_lib/db.js";
import Paciente from "../_models/Paciente.js";
import { getBearerToken, verifyToken } from "../_lib/auth.js";
import {
  badRequest,
  methodNotAllowed,
  sendJson,
  unauthorized,
} from "../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  const token = getBearerToken(req);
  if (!token) return unauthorized(res);

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return unauthorized(res, "Token inválido");
  }

  if (req.method === "GET") {
    const pacientes = await Paciente.find({ veterinario: decoded.id })
      .sort({ createdAt: -1 })
      .lean();
    return sendJson(res, 200, pacientes);
  }

  if (req.method === "POST") {
    const { nombre, propietario, email, fecha, sintomas } = req.body || {};
    if (!nombre || !propietario || !email || !fecha || !sintomas) {
      return badRequest(res, "Todos los campos son obligatorios");
    }

    const paciente = await Paciente.create({
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      veterinario: decoded.id,
    });

    return sendJson(res, 201, paciente);
  }

  return methodNotAllowed(res);
}

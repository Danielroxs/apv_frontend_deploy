import { connectDb } from "../../_lib/db.js";
import Veterinario from "../../_models/Veterinario.js";
import { getBearerToken, verifyToken } from "../../_lib/auth.js";
import {
  badRequest,
  methodNotAllowed,
  sendJson,
  unauthorized,
} from "../../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "PUT") return methodNotAllowed(res);

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
  if (String(id) !== String(decoded.id)) {
    return unauthorized(res, "No autorizado");
  }

  const { nombre, email, telefono = "", web = "" } = req.body || {};
  if (!nombre || !email) {
    return badRequest(res, "Email y Nombre son obligatorios");
  }

  const existeEmail = await Veterinario.findOne({
    email: String(email).toLowerCase(),
    _id: { $ne: id },
  });
  if (existeEmail) {
    return sendJson(res, 400, { msg: "Ese email ya está en uso" });
  }

  const veterinario = await Veterinario.findByIdAndUpdate(
    id,
    {
      nombre,
      email: String(email).toLowerCase(),
      telefono,
      web,
    },
    { new: true },
  ).select("_id nombre email telefono web");

  return sendJson(res, 200, {
    msg: "Perfil actualizado correctamente",
    veterinario,
  });
}

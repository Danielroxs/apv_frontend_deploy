import { connectDb } from "../_lib/db.js";
import Veterinario from "../_models/Veterinario.js";
import { getBearerToken, verifyToken } from "../_lib/auth.js";
import {
  badRequest,
  methodNotAllowed,
  sendJson,
  unauthorized,
} from "../_lib/res.js";

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

  const { pwd_actual, pwd_nuevo } = req.body || {};
  if (!pwd_actual || !pwd_nuevo) {
    return badRequest(res, "Todos los campos son obligatorios");
  }

  if (String(pwd_nuevo).length < 6) {
    return badRequest(res, "El password debe contener al menos 6 caracteres");
  }

  const veterinario = await Veterinario.findById(decoded.id);
  if (!veterinario) return unauthorized(res);

  const ok = await veterinario.comprobarPassword(pwd_actual);
  if (!ok) {
    return sendJson(res, 403, { msg: "El password actual es incorrecto" });
  }

  veterinario.password = pwd_nuevo;
  await veterinario.save();

  return sendJson(res, 200, { msg: "Password actualizado correctamente" });
}

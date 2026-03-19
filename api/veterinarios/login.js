import { connectDb } from "../_lib/db.js";
import Veterinario from "../_models/Veterinario.js";
import { badRequest, methodNotAllowed, sendJson } from "../_lib/res.js";
import { signToken } from "../_lib/auth.js";

export default async function handler(req, res) {
  // Soporte para OPTIONS y CORS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return res.status(200).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  await connectDb();

  if (req.method !== "POST") return methodNotAllowed(res);

  const { email, password } = req.body || {};
  if (!email || !password) {
    return badRequest(res, "Todos los campos son obligatorios");
  }

  const veterinario = await Veterinario.findOne({
    email: String(email).toLowerCase(),
  });

  if (!veterinario) {
    return sendJson(res, 404, { msg: "El usuario no existe" });
  }

  if (!veterinario.confirmado) {
    return sendJson(res, 403, { msg: "Tu cuenta no ha sido confirmada" });
  }

  const passwordOk = await veterinario.comprobarPassword(password);
  if (!passwordOk) {
    return sendJson(res, 403, { msg: "Password incorrecto" });
  }

  const token = signToken({ id: veterinario._id.toString() });

  return sendJson(res, 200, {
    _id: veterinario._id,
    nombre: veterinario.nombre,
    email: veterinario.email,
    token,
  });
}

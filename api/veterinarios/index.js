import crypto from "crypto";
import { connectDb } from "../_lib/db.js";
import Veterinario from "../_models/Veterinario.js";
import { badRequest, methodNotAllowed, sendJson } from "../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "POST") return methodNotAllowed(res);

  const { nombre, email, password } = req.body || {};
  if (!nombre || !email || !password) {
    return badRequest(res, "Todos los campos son obligatorios");
  }

  const existe = await Veterinario.findOne({
    email: String(email).toLowerCase(),
  });
  if (existe) {
    return sendJson(res, 400, { msg: "El usuario ya está registrado" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  const veterinario = new Veterinario({
    nombre,
    email,
    password,
    token,
    confirmado: true,
  });

  await veterinario.save();

  // Para portfolio/demo: marcamos confirmado=true para no depender de email.
  return sendJson(res, 201, {
    msg: "Cuenta creada correctamente",
  });
}

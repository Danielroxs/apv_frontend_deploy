import { connectDb } from "../../_lib/db.js";
import Veterinario from "../../_models/Veterinario.js";
import { methodNotAllowed, notFound, sendJson } from "../../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "GET") return methodNotAllowed(res);

  const { token } = req.query || {};
  if (!token) return notFound(res);

  const veterinario = await Veterinario.findOne({ token: String(token) });
  if (!veterinario) {
    return notFound(res, "Token no válido");
  }

  veterinario.token = "";
  veterinario.confirmado = true;
  await veterinario.save();

  return sendJson(res, 200, { msg: "Cuenta confirmada correctamente" });
}

import { connectDb } from "../../_lib/db.js";
import Veterinario from "../../_models/Veterinario.js";
import {
  badRequest,
  methodNotAllowed,
  notFound,
  sendJson,
} from "../../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  const { token } = req.query || {};
  if (!token) return notFound(res);

  const veterinario = await Veterinario.findOne({ token: String(token) });
  if (!veterinario) return notFound(res, "Token no válido");

  if (req.method === "GET") {
    return sendJson(res, 200, { msg: "Token válido" });
  }

  if (req.method === "POST") {
    const { password } = req.body || {};
    if (!password || String(password).length < 6) {
      return badRequest(res, "Debe contener al menos 6 caracteres");
    }

    veterinario.password = password;
    veterinario.token = "";
    await veterinario.save();

    return sendJson(res, 200, { msg: "Password actualizado correctamente" });
  }

  return methodNotAllowed(res);
}

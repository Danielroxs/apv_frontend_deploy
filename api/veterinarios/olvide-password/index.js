import crypto from "crypto";
import { connectDb } from "../../_lib/db.js";
import Veterinario from "../../_models/Veterinario.js";
import { badRequest, methodNotAllowed, sendJson } from "../../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "POST") return methodNotAllowed(res);

  const { email } = req.body || {};
  if (!email) return badRequest(res, "El email es obligatorio");

  const veterinario = await Veterinario.findOne({
    email: String(email).toLowerCase(),
  });

  if (!veterinario) {
    return sendJson(res, 404, { msg: "El usuario no existe" });
  }

  veterinario.token = crypto.randomBytes(20).toString("hex");
  await veterinario.save();

  // Demo/portfolio: no enviamos email. Devolvemos un enlace/route para reset.
  return sendJson(res, 200, {
    msg: "Hemos generado un token para reestablecer tu password (demo).",
    resetPath: `/olvide-password/${veterinario.token}`,
  });
}

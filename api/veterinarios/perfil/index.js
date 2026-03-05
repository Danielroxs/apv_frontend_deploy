import { connectDb } from "../../_lib/db.js";
import Veterinario from "../../_models/Veterinario.js";
import { getBearerToken, verifyToken } from "../../_lib/auth.js";
import { methodNotAllowed, sendJson, unauthorized } from "../../_lib/res.js";

export default async function handler(req, res) {
  await connectDb();

  if (req.method !== "GET") return methodNotAllowed(res);

  const token = getBearerToken(req);
  if (!token) return unauthorized(res);

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return unauthorized(res, "Token inválido");
  }

  const veterinario = await Veterinario.findById(decoded.id).select(
    "_id nombre email telefono web",
  );

  if (!veterinario) return unauthorized(res, "No autorizado");

  return sendJson(res, 200, veterinario);
}

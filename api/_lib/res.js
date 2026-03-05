export function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function methodNotAllowed(res) {
  return sendJson(res, 405, { msg: "Método no permitido" });
}

export function badRequest(res, msg = "Solicitud inválida") {
  return sendJson(res, 400, { msg });
}

export function unauthorized(res, msg = "No autorizado") {
  return sendJson(res, 401, { msg });
}

export function notFound(res, msg = "No encontrado") {
  return sendJson(res, 404, { msg });
}

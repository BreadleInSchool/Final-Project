export function ok(res, data) {
  return res.json({ success: true, data });
}

export function created(res, data) {
  return res.status(201).json({ success: true, data });
}

export function error(res, status, message) {
  return res.status(status).json({ success: false, error: message });
}

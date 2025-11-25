import { verifyToken } from '../utils/tokenUtils.js';
import { error as errorResponse } from '../utils/responseUtils.js';

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return errorResponse(res, 401, 'Missing token');
  const token = auth.slice(7);
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch (e) {
    return errorResponse(res, 401, 'Invalid token');
  }
}

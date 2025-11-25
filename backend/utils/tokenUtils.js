import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export function signToken(payload, opts = { expiresIn: '12h' }) {
  return jwt.sign(payload, JWT_SECRET, opts);
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

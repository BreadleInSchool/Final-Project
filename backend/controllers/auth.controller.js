import { createUser, findByEmail, findById } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/tokenUtils.js';
import { ok, created, error } from '../utils/responseUtils.js';

export async function register(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password) return error(res, 400, 'email and password required');
  try {
    const existing = await findByEmail(email);
    if (existing) return error(res, 409, 'User already exists');
    const insertedId = await createUser({ email, password, name });
    const token = signToken({ id: insertedId.toString(), email });
    return created(res, { token });
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Internal error');
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return error(res, 400, 'email and password required');
  try {
    const user = await findByEmail(email);
    if (!user) return error(res, 401, 'Invalid credentials');
    const okPass = await bcrypt.compare(password, user.passwordHash);
    if (!okPass) return error(res, 401, 'Invalid credentials');
    const token = signToken({ id: user._id.toString(), email: user.email });
    return ok(res, { token });
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Internal error');
  }
}

export async function me(req, res) {
  try {
    const id = req.user.id;
    const user = await findById(id);
    if (!user) return error(res, 404, 'User not found');
    return ok(res, user);
  } catch (err) {
    console.error(err);
    return error(res, 500, 'Internal error');
  }
}

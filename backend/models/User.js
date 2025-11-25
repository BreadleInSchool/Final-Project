import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getCollection } from '../config/database.js';

const SALT_ROUNDS = 10;

export async function createUser({ email, password, name = null }) {
  const users = getCollection('users');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const doc = { email, name, passwordHash, createdAt: new Date() };
  const result = await users.insertOne(doc);
  return result.insertedId;
}

export async function findByEmail(email) {
  const users = getCollection('users');
  return users.findOne({ email });
}

export async function findById(id) {
  const users = getCollection('users');
  return users.findOne({ _id: new ObjectId(id) }, { projection: { passwordHash: 0 } });
}

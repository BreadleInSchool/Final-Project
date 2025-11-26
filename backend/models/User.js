import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getCollection } from '../config/database.js';

const SALT_ROUNDS = 10;

export async function createUser({ email, password, firstName = null, lastName = null, phone = null, address = null }) {
  const customers = getCollection('customers');
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const doc = {
    email,
    firstName,
    lastName,
    phone,
    address,
    passwordHash,
    createdAt: new Date()
  };
  const result = await customers.insertOne(doc);
  return result.insertedId;
}

export async function findByEmail(email) {
  const customers = getCollection('customers');
  return customers.findOne({ email });
}

export async function findById(id) {
  const customers = getCollection('customers');
  return customers.findOne({ _id: new ObjectId(id) }, { projection: { passwordHash: 0 } });
}

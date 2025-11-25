import { MongoClient } from 'mongodb';

let _client = null;
let _db = null;

export async function connectToDatabase(uri, dbName = 'final_project') {
  if (_db) return _db;
  _client = new MongoClient(uri);
  await _client.connect();
  _db = _client.db(dbName);
  return _db;
}

export function getDb() {
  if (!_db) throw new Error('Database not connected. Call connectToDatabase first.');
  return _db;
}

export function getCollection(name) {
  return getDb().collection(name);
}

export async function closeDatabase() {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
  }
}

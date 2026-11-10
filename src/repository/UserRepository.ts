import Database from 'better-sqlite3';
import fs from 'fs';
import { UserEntity } from '../models/entities/UserEntity.js';

if (!fs.existsSync('./data')) fs.mkdirSync('./data');

const db = new Database('./data/app.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

export class UserRepository {
  static createUser(name: string, email: string, passwordHash: string): number {
    const statement = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const result = statement.run(name, email, passwordHash);
    return result.lastInsertRowid as number;
  }

  static findByEmail(email: string): UserEntity | undefined {
    const statement = db.prepare('SELECT * FROM users WHERE email = ?');
    return statement.get(email) as UserEntity | undefined;
  }

  static findById(id: number): UserEntity | undefined {
    const statement = db.prepare('SELECT * FROM users WHERE id = ?');
    return statement.get(id) as UserEntity | undefined;
  }
}

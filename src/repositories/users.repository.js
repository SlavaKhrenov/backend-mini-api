const { get, run, all } = require("../db/db");

async function findById(id) {
  return get("SELECT id, name, email, created_at FROM users WHERE id = ?", [id]);
}

async function findByName(name) {
  return get("SELECT id, name, email, created_at FROM users WHERE name = ?", [name]);
}

async function findAll() {
  return all("SELECT * FROM users");
}

async function findByEmail(email) {
  return get("SELECT id, name, email, created_at FROM users WHERE email = ?", [email]);
}

async function create({ name, email, password_hash }) {
  const result = await run(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, password_hash]
  );
  return findById(result.lastID);
}

async function findByEmailWithPassword(email) {
  return get(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?",
    [email]
  );
}

module.exports = {findById, findByName, findByEmail, findAll, create, findByEmailWithPassword};

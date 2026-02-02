const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/users.repository");

const { JWT_SECRET } = require("../config");

async function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("VALIDATION_ERROR");
  }

  const existing = await usersRepository.findByEmail(email);
  if (existing) throw new Error("EMAIL_TAKEN");

  const hash = await bcrypt.hash(password, 10);

  return usersRepository.create({
    name,
    email,
    password_hash: hash,
  });
}

async function login({ email, password }) {
  if (!email || !password) throw new Error("VALIDATION_ERROR");

  const user = await usersRepository.findByEmailWithPassword(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error("INVALID_CREDENTIALS");

  const token = jwt.sign(
    { user_id: user.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}

module.exports = { register, login };

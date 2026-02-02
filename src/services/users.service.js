const usersRepository = require("../repositories/users.repository");

async function getById(id) {
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    throw new Error("BAD_ID");
  }

  const user = await usersRepository.findById(numId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}

async function getByName(name) {
  if (!name) {
    throw new Error("VALIDATION_ERROR");
  }

  const user = await usersRepository.findByName(name);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}

async function getAll() {
  return usersRepository.findAll();
}

async function create({ name, email }) {
  if (!name || typeof name !== "string") throw new Error("VALIDATION_ERROR");
  if (!email || typeof email !== "string") throw new Error("VALIDATION_ERROR");
  if (!email.includes("@")) throw new Error("VALIDATION_ERROR");

  const existing = await usersRepository.findByEmail(email);
  if (existing) throw new Error("EMAIL_TAKEN");

  return usersRepository.create({ name: name.trim(), email: email.trim().toLowerCase() });
}

module.exports = { getById, getByName, getAll, create};

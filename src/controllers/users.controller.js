const usersService = require("../services/users.service");

async function getById(req, res) {
  const id = req.params.id;
  const user = await usersService.getById(id);
  res.json(user);
}

async function getByName(req, res) {
  const name = req.params.name;
  const user = await usersService.getByName(name);
  res.json(user);
}

async function getAll(req, res) {
  const users = await usersService.getAll();
  res.json(users);
}

async function create(req, res) {
  const { name, email } = req.body;
  const user = await usersService.create({ name, email });
  res.status(201).json(user);
}

module.exports = { getById, getByName, getAll, create};

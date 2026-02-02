const ordersService = require("../services/orders.service");

async function create(req, res) {
  const order = await ordersService.createOrder(req.body);
  res.status(201).json(order);
}

async function create(req, res) {
  const order = await ordersService.createOrder({
    user_id: req.user.id,
    items: req.body.items,
  });
  res.status(201).json(order);
}

async function getById(req, res) {
  const order = await ordersService.getById(req.params.id);
  res.json(order);
}

async function getByUserId(req, res) {
  const orders = await ordersService.getByUserId(req.params.id);
  res.json(orders);
}

module.exports = { create, getById, getByUserId };

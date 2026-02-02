const usersRepository = require("../repositories/users.repository");
const { get } = require("../db/db");
const ordersRepository = require("../repositories/orders.repository");

async function createOrder({ user_id, items }) {
  const userId = Number(user_id);

  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("VALIDATION_ERROR");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("VALIDATION_ERROR");
  }

  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  for (const it of items) {
    const pid = Number(it.product_id);
    const qty = Number(it.qty);

    if (!Number.isInteger(pid) || pid <= 0) throw new Error("VALIDATION_ERROR");
    if (!Number.isInteger(qty) || qty <= 0) throw new Error("VALIDATION_ERROR");

    const product = await get("SELECT id FROM products WHERE id = ?", [pid]);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }

  return ordersRepository.createOrderWithItems({
    userId,
    items: items.map((x) => ({
      product_id: Number(x.product_id),
      qty: Number(x.qty),
    })),
  });
}

async function getById(id) {
  const orderId = Number(id);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new Error("BAD_ID");
  }

  const order = await ordersRepository.getByIdWithItems(orderId);
  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return order;
}

async function getByUserId(userId) {
  const uid = Number(userId);
  if (!Number.isInteger(uid) || uid <= 0) {
    throw new Error("BAD_ID");
  }

  const user = await usersRepository.findById(uid);
  if (!user) throw new Error("USER_NOT_FOUND");

  return ordersRepository.getByUserIdWithItems(uid);
}

module.exports = { createOrder, getById, getByUserId };

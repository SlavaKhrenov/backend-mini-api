const { run, all, get, transaction } = require("../db/db");

async function createOrderWithItems({ userId, items }) {
  return transaction(async () => {
    const orderRes = await run(
      "INSERT INTO orders (user_id, status) VALUES (?, 'new')",
      [userId]
    );

    const orderId = orderRes.lastID;

    for (const it of items) {
      await run(
        "INSERT INTO order_items (order_id, product_id, qty) VALUES (?, ?, ?)",
        [orderId, it.product_id, it.qty]
      );
    }

    const order = await get(
      "SELECT id, user_id, status, created_at FROM orders WHERE id = ?",
      [orderId]
    );

    const orderItems = await all(
      `SELECT oi.id, oi.product_id, p.name, p.price, oi.qty
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?
       ORDER BY oi.id`,
      [orderId]
    );

    return { ...order, items: orderItems };
  });
}

async function getById(id) {
  return get("SELECT * FROM orders WHERE id = ?", [id]);
}

async function getByIdWithItems(orderId) {
  const rows = await all(
    `SELECT
        o.id        AS order_id,
        o.user_id   AS user_id,
        o.status    AS status,
        o.created_at AS created_at,
        oi.id       AS item_id,
        oi.qty      AS qty,
        p.id        AS product_id,
        p.name      AS product_name,
        p.price     AS product_price
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE o.id = ?
     ORDER BY oi.id`,
    [orderId]
  );

  if (rows.length === 0) return null;

  const order = {
    id: rows[0].order_id,
    user_id: rows[0].user_id,
    status: rows[0].status,
    created_at: rows[0].created_at,
    items: [],
  };

  for (const r of rows) {
    if (r.item_id == null) continue;

    order.items.push({
      id: r.item_id,
      product_id: r.product_id,
      name: r.product_name,
      price: r.product_price,
      qty: r.qty,
    });
  }

  return order;
}

async function getByUserIdWithItems(userId) {
  const rows = await all(
    `SELECT
        o.id        AS order_id,
        o.user_id   AS user_id,
        o.status    AS status,
        o.created_at AS created_at,
        oi.id       AS item_id,
        oi.qty      AS qty,
        p.id        AS product_id,
        p.name      AS product_name,
        p.price     AS product_price
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     LEFT JOIN products p ON p.id = oi.product_id
     WHERE o.user_id = ?
     ORDER BY o.id, oi.id`,
    [userId]
  );

  const map = new Map();

  for (const r of rows) {
    if (!map.has(r.order_id)) {
      map.set(r.order_id, {
        id: r.order_id,
        user_id: r.user_id,
        status: r.status,
        created_at: r.created_at,
        items: [],
      });
    }

    if (r.item_id != null) {
      map.get(r.order_id).items.push({
        id: r.item_id,
        product_id: r.product_id,
        name: r.product_name,
        price: r.product_price,
        qty: r.qty,
      });
    }
  }

  return Array.from(map.values());
}

module.exports = { createOrderWithItems, getById, getByIdWithItems, getByUserIdWithItems };

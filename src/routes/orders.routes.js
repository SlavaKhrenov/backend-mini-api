const express = require("express");
const ordersController = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/orders/:id", ordersController.getById);
router.get("/users/:id/orders", ordersController.getByUserId);
router.post("/orders", authMiddleware, ordersController.create);

module.exports = router;

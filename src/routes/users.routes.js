const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/users", usersController.getAll);
router.get("/users/by-name/:name", usersController.getByName);
router.get("/users/:id", usersController.getById);
router.post("/users", usersController.create);

module.exports = router;

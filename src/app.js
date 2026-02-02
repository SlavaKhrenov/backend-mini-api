const express = require("express");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(usersRoutes);
app.use(ordersRoutes);

app.use(errorMiddleware);

module.exports = app;

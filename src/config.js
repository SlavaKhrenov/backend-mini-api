const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

module.exports = { PORT, JWT_SECRET };

const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "NO_TOKEN" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "BAD_TOKEN_FORMAT" });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.user_id };
    next();
  } 
  catch (err) {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}

module.exports = authMiddleware;

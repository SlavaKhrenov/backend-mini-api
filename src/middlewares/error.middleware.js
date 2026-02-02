function errorMiddleware(err, req, res, next) {
  if (err.message === "BAD_ID") {
    return res.status(400).json({ error: "BAD_ID" });
  }

  if (err.message === "VALIDATION_ERROR") {
    return res.status(400).json({ error: "VALIDATION_ERROR" });
  }

  if (err.message === "INVALID_CREDENTIALS") {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  if (err.message === "USER_NOT_FOUND") {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }

  if (err.message === "ORDER_NOT_FOUND") {
    return res.status(404).json({ error: "ORDER_NOT_FOUND" });
  }

  if (err.message === "EMAIL_TAKEN") {
    return res.status(409).json({ error: "EMAIL_TAKEN" });
  }

  if (err.message === "PRODUCT_NOT_FOUND") {
    return res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
  }

  console.error(err);
  return res.status(500).json({ error: "INTERNAL_ERROR" });
}

module.exports = errorMiddleware;

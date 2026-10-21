const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (err.code === 11000 ? 409 : 500);
  if (statusCode >= 500) console.error("Request failed", { path: req.path, statusCode });

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Internal Server Error" : (err.message || "Request failed"),
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

module.exports = errorHandler;

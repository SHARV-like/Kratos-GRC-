const { errorResponse } = require("../utils/response");
const logger = require("../utils/logger");

const notFoundHandler = (req, res) => {
  return errorResponse(res, {
    statusCode: 404,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || error.status || 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : error.message || "Internal server error";

  logger.error(message, {
    method: req.method,
    path: req.originalUrl,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });

  return errorResponse(res, {
    statusCode,
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

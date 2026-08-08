const { validationResult } = require("express-validator");

const { errorResponse } = require("../utils/response");

const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return errorResponse(res, {
    statusCode: 422,
    message: "Validation failed.",
    errors: result.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  });
};

module.exports = validateRequest;

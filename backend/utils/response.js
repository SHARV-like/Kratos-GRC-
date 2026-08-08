const successResponse = (
  res,
  { statusCode = 200, message = "Success", data, meta } = {},
) => {
  const payload = {
    success: true,
    message,
  };

  if (data !== undefined) {
    payload.data = data;
  }

  if (meta !== undefined) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

const errorResponse = (
  res,
  { statusCode = 500, message = "Internal server error", errors } = {},
) => {
  const payload = {
    success: false,
    message,
  };

  if (errors !== undefined) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse,
};

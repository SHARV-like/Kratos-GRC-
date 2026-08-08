const jwt = require("jsonwebtoken");

const { authConfig } = require("../config/auth");
const AppError = require("../utils/AppError");

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

const authenticate = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return next(new AppError("Authentication token is required.", 401));
  }

  try {
    const payload = jwt.verify(token, authConfig.jwtSecret);

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    return next();
  } catch (error) {
    return next(new AppError("Authentication token is invalid or expired.", 401));
  }
};

module.exports = authenticate;

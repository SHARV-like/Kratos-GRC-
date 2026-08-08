const authService = require("../services/authService");
const { successResponse } = require("../utils/response");

const register = async (req, res) => {
  const authResult = await authService.register(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "User registered successfully.",
    data: authResult,
  });
};

const login = async (req, res) => {
  const authResult = await authService.login(req.body);

  return successResponse(res, {
    message: "User logged in successfully.",
    data: authResult,
  });
};

const me = async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return successResponse(res, {
    message: "Authenticated user retrieved successfully.",
    data: {
      user,
    },
  });
};

module.exports = {
  register,
  login,
  me,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authConfig } = require("../config/auth");
const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

const buildAuthPayload = (user) => {
  const publicUser = user.toPublicJSON();
  const token = jwt.sign(
    {
      sub: publicUser.id,
      role: publicUser.role,
    },
    authConfig.jwtSecret,
    {
      expiresIn: authConfig.jwtExpiresIn,
    },
  );

  return {
    user: publicUser,
    token,
  };
};

const register = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email is already registered.", 409);
  }

  const passwordHash = await bcrypt.hash(
    password,
    authConfig.passwordSaltRounds,
  );

  const user = await userRepository.createUser({
    name,
    email,
    passwordHash,
    role,
  });

  logger.info("User registered", {
    userId: user._id.toString(),
    role: user.role,
  });

  return buildAuthPayload(user);
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmailWithPassword(email);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (!user.isActive) {
    throw new AppError("User account is disabled.", 403);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password.", 401);
  }

  logger.info("User logged in", {
    userId: user._id.toString(),
    role: user.role,
  });

  return buildAuthPayload(user);
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user || !user.isActive) {
    throw new AppError("Authenticated user not found.", 401);
  }

  return user.toPublicJSON();
};

module.exports = {
  register,
  login,
  getCurrentUser,
};

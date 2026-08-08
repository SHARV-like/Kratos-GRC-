const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  passwordSaltRounds: Number(process.env.PASSWORD_SALT_ROUNDS || 12),
};

const validateAuthConfig = () => {
  if (!authConfig.jwtSecret) {
    throw new Error("JWT_SECRET is required. Add it to backend/.env.");
  }

  if (!Number.isInteger(authConfig.passwordSaltRounds)) {
    throw new Error("PASSWORD_SALT_ROUNDS must be an integer.");
  }

  if (authConfig.passwordSaltRounds < 10) {
    throw new Error("PASSWORD_SALT_ROUNDS must be at least 10.");
  }
};

module.exports = {
  authConfig,
  validateAuthConfig,
};

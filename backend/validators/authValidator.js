const { body } = require("express-validator");

const { ROLES } = require("../../shared/constants/roles");

const registerValidationRules = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .bail()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters."),
  body("email")
    .isEmail()
    .withMessage("Email must be valid.")
    .bail()
    .normalizeEmail(),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.",
    ),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role is not supported."),
];

const loginValidationRules = [
  body("email")
    .isEmail()
    .withMessage("Email must be valid.")
    .bail()
    .normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password must be a string.")
    .bail()
    .notEmpty()
    .withMessage("Password is required."),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
};

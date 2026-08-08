const express = require("express");

const authController = require("../controllers/authController");
const asyncHandler = require("../middleware/asyncHandler");
const authenticate = require("../middleware/authenticate");
const validateRequest = require("../middleware/validateRequest");
const {
  registerValidationRules,
  loginValidationRules,
} = require("../validators/authValidator");

const router = express.Router();

router.post(
  "/register",
  registerValidationRules,
  validateRequest,
  asyncHandler(authController.register),
);

router.post(
  "/login",
  loginValidationRules,
  validateRequest,
  asyncHandler(authController.login),
);

router.get("/me", authenticate, asyncHandler(authController.me));

module.exports = router;

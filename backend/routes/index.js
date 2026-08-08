const express = require("express");
const mongoose = require("mongoose");

const { successResponse } = require("../utils/response");

const router = express.Router();

router.get("/", (req, res) => {
  return successResponse(res, {
    message: "GRC API v1",
    data: {
      routes: {
        health: "/api/v1/health",
        auth: "/api/v1/auth",
        policies: "/api/v1/policies",
        risks: "/api/v1/risks",
        compliance: "/api/v1/compliance",
      },
    },
  });
});

router.get("/health", (req, res) => {
  return successResponse(res, {
    message: "Backend service healthy",
    data: {
      service: "grc-hackathon-backend",
      environment: process.env.NODE_ENV || "development",
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = router;

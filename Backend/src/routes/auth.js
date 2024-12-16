const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middleware/validate");

// Register route
router.post("/register", registerValidation, validate, authController.register);

// src/routes/auth.js
router.post('/register-admin', registerValidation, validate, authController.registerAdmin);

// Login route
router.post("/login", loginValidation, validate, authController.login);

// Get profile route (protected)
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;

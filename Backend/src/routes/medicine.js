// medicine route

const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");
const authMiddleware = require("../middleware/auth");
const { medicineValidation } = require("../middleware/medicineValidate");
const { validate } = require("../middleware/validate");

// All routes are protected with authMiddleware
router.use(authMiddleware);

// Create new medicine
router.post("/", medicineValidation, validate, medicineController.create);

// Get all medicines for user
router.get("/", medicineController.getAllForUser);

// Get single medicine
router.get("/:id", medicineController.getById);

// Update medicine
router.put("/:id", medicineValidation, validate, medicineController.update);

// Delete medicine
router.delete("/:id", medicineController.delete);

module.exports = router;

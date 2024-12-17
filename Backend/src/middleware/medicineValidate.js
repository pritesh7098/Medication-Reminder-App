// // Seprate medicine mw for easier access.

const { body } = require("express-validator");
const { validate } = require("./validate"); // Reusing the existing validate middleware

const medicineValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Medicine name is required")
    .isLength({ max: 100 })
    .withMessage("Medicine name must be less than 100 characters"),

  body("dosage")
    .trim()
    .notEmpty()
    .withMessage("Dosage is required")
    .isLength({ max: 50 })
    .withMessage("Dosage must be less than 50 characters"),

  body("schedule_time")
    .notEmpty()
    .withMessage("Schedule time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Schedule time must be in HH:MM format"),

  body("recurring_days")
    .isArray()
    .withMessage("Recurring days must be an array")
    .custom((value) => {
      if (
        !value.every((day) => Number.isInteger(day) && day >= 1 && day <= 7)
      ) {
        throw new Error("Recurring days must be integers between 1 and 7");
      }
      return true;
    }),
];

module.exports = {
  medicineValidation,
};

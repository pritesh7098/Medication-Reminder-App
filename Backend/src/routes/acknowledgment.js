const express = require('express');
const router = express.Router();
const acknowledgmentController = require('../controllers/acknowledgmentController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');

// Validation middleware
const validateAcknowledgment = [
    body('medicineId').isInt().withMessage('Valid medicine ID is required'),
    body('status')
        .isIn(['taken', 'missed', 'skipped'])
        .withMessage('Status must be taken, missed, or skipped')
];

// All routes require authentication
router.use(authMiddleware);

// Log acknowledgment
router.post(
    '/log', 
    validateAcknowledgment,
    acknowledgmentController.logAcknowledgment
);

// Get user's logs
router.get(
    '/user-logs',
    acknowledgmentController.getUserLogs
);

// Get all logs (admin only)
router.get(
    '/all-logs',
    acknowledgmentController.getAllLogs
);

module.exports = router;

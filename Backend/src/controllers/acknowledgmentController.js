const acknowledgmentModel = require("../models/acknowledgment");

const acknowledgmentController = {
  // Log medicine acknowledgment
  async logAcknowledgment(req, res) {
    try {
      const { medicineId, status } = req.body;
      const userId = req.user.id; // From auth middleware

      if (!["taken", "missed", "skipped"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Must be taken, missed, or skipped",
        });
      }

      const log = await acknowledgmentModel.createLog(
        userId,
        medicineId,
        status
      );
      res.status(201).json({
        message: "Acknowledgment logged successfully",
        data: log,
      });
    } catch (error) {
      console.error("Error logging acknowledgment:", error);
      res.status(500).json({ message: "Error logging acknowledgment" });
    }
  },

  // Get user's logs
  async getUserLogs(req, res) {
    try {
      const userId = req.user.id;
      const { startDate, endDate } = req.query;

      const logs = await acknowledgmentModel.getUserLogs(
        userId,
        startDate,
        endDate
      );

      res.json({
        message: "Logs retrieved successfully",
        data: logs,
      });
    } catch (error) {
      console.error("Error retrieving logs:", error);
      res.status(500).json({ message: "Error retrieving logs" });
    }
  },

  // Admin: Get all logs
  async getAllLogs(req, res) {
    try {
      const { startDate, endDate, userId } = req.query;

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only.",
        });
      }

      const logs = await acknowledgmentModel.getAllLogs(
        startDate,
        endDate,
        userId
      );

      res.json({
        message: "Logs retrieved successfully",
        data: logs,
      });
    } catch (error) {
      console.error("Error retrieving logs:", error);
      res.status(500).json({ message: "Error retrieving logs" });
    }
  },
};

module.exports = acknowledgmentController;

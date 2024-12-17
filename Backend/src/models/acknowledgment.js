// I have created seprate ack model for clean code.

const pool = require("../config/database");

const acknowledgmentModel = {
  // Create a new acknowledgment log
  async createLog(userId, medicineId, status) {
    try {
      const result = await pool.query(
        `INSERT INTO acknowledgment_logs (user_id, medicine_id, status) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`,
        [userId, medicineId, status]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Get logs for a specific user
  async getUserLogs(userId, startDate, endDate) {
    try {
      const result = await pool.query(
        `SELECT al.*, m.name as medicine_name, m.dosage, m.schedule_time
                 FROM acknowledgment_logs al
                 JOIN medicines m ON al.medicine_id = m.id
                 WHERE al.user_id = $1
                 AND al.acknowledged_at >= $2
                 AND al.acknowledged_at <= $3
                 ORDER BY al.acknowledged_at DESC`,
        [userId, startDate || "1970-01-01", endDate || "now()"]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get all logs (admin only)
  async getAllLogs(startDate, endDate, userId = null) {
    try {
      let query = `
                SELECT al.*, 
                       m.name as medicine_name, 
                       m.dosage, 
                       m.schedule_time,
                       u.name as user_name,
                       u.email as user_email
                FROM acknowledgment_logs al
                JOIN medicines m ON al.medicine_id = m.id
                JOIN users u ON al.user_id = u.id
                WHERE al.acknowledged_at >= $1 
                AND al.acknowledged_at <= $2`;

      const params = [startDate || "1970-01-01", endDate || "now()"];

      if (userId) {
        query += " AND al.user_id = $3";
        params.push(userId);
      }

      query += " ORDER BY al.acknowledged_at DESC";

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = acknowledgmentModel;

const pool = require("../config/database");

const medicineController = {
  // Create new medicine
  async create(req, res) {
    try {
      const { name, dosage, schedule_time, recurring_days } = req.body;

      // Validate required fields
      if (!name || !dosage || !schedule_time || !recurring_days) {
        return res.status(400).json({
          message:
            "All fields are required: name, dosage, schedule_time, recurring_days",
        });
      }

      /*   /// Validate time format (HH:mm:ss)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(schedule_time)) {
        return res.status(400).json({
          message: "Invalid time format. Expected HH:mm:ss",
        });
      } */

      // Validate recurring days
      if (!recurring_days.every((day) => day >= 1 && day <= 7)) {
        return res.status(400).json({
          message: "Invalid recurring days. Must be numbers between 1 and 7",
        });
      }

      const userId = req.user.id; // From auth middleware

      const newMedicine = await pool.query(
        `INSERT INTO medicines 
                (user_id, name, dosage, schedule_time, recurring_days) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
        [userId, name, dosage, schedule_time, recurring_days]
      );

      res.status(201).json({
        message: "Medicine created successfully",
        medicine: newMedicine.rows[0],
      });
    } catch (error) {
      console.error("Create medicine error:", error);
      res.status(500).json({ message: "Error creating medicine" });
    }
  },

  // Get all medicines for a user
  async getAllForUser(req, res) {
    try {
      const userId = req.user.id;

      const medicines = await pool.query(
        `SELECT * FROM medicines 
                WHERE user_id = $1 
                ORDER BY created_at DESC`,
        [userId]
      );

      res.json(medicines.rows);
    } catch (error) {
      console.error("Fetch medicines error:", error);
      res.status(500).json({ message: "Error fetching medicines" });
    }
  },

  // Get single medicine by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const medicine = await pool.query(
        `SELECT * FROM medicines 
                WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );

      if (medicine.rows.length === 0) {
        return res.status(404).json({ message: "Medicine not found" });
      }

      res.json(medicine.rows[0]);
    } catch (error) {
      console.error("Fetch medicine error:", error);
      res.status(500).json({ message: "Error fetching medicine" });
    }
  },

  // Update medicine
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, dosage, schedule_time, recurring_days } = req.body;
      const userId = req.user.id;

      const updatedMedicine = await pool.query(
        `UPDATE medicines 
                SET name = $1, 
                    dosage = $2, 
                    schedule_time = $3, 
                    recurring_days = $4,
                    updated_at = CURRENT_TIMESTAMP 
                WHERE id = $5 AND user_id = $6 
                RETURNING *`,
        [name, dosage, schedule_time, recurring_days, id, userId]
      );

      if (updatedMedicine.rows.length === 0) {
        return res.status(404).json({ message: "Medicine not found" });
      }

      res.json({
        message: "Medicine updated successfully",
        medicine: updatedMedicine.rows[0],
      });
    } catch (error) {
      console.error("Update medicine error:", error);
      res.status(500).json({ message: "Error updating medicine" });
    }
  },

  // Delete medicine
  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await pool.query(
        `DELETE FROM medicines 
                WHERE id = $1 AND user_id = $2 
                RETURNING *`,
        [id, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Medicine not found" });
      }

      res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
      console.error("Delete medicine error:", error);
      res.status(500).json({ message: "Error deleting medicine" });
    }
  },
};

module.exports = medicineController;

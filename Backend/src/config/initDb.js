const pool = require("./database");

const createTables = async () => {
  try {
    // Create tables in sequence
    await pool.query(`
            -- Users Table
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'admin')),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );



            -- Medicines Table
            CREATE TABLE IF NOT EXISTS medicines (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(100) NOT NULL,
                dosage VARCHAR(50) NOT NULL,
                schedule_time TIME NOT NULL,
                recurring_days INTEGER[] NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            -- Acknowledgment Logs Table
            CREATE TABLE IF NOT EXISTS acknowledgment_logs (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                medicine_id INTEGER REFERENCES medicines(id) ON DELETE CASCADE,
                status VARCHAR(20) NOT NULL CHECK (status IN ('taken', 'missed', 'skipped')),
                acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            -- Create indexes
            CREATE INDEX IF NOT EXISTS idx_medicines_user_id ON medicines(user_id);
            CREATE INDEX IF NOT EXISTS idx_acknowledgment_logs_user_id ON acknowledgment_logs(user_id);
            CREATE INDEX IF NOT EXISTS idx_acknowledgment_logs_medicine_id ON acknowledgment_logs(medicine_id);
        `);

    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

// Execute the function if this file is run directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log("Database initialization completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database initialization failed:", error);
      process.exit(1);
    });
}

module.exports = createTables;

// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// routes

const authRoutes = require("./routes/auth");
const medicineRoutes = require("./routes/medicine");
const acknowledgmentRoutes = require("./routes/acknowledgment");

require("dotenv").config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/acknowledgments", acknowledgmentRoutes);

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

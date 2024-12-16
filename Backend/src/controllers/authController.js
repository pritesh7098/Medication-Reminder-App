const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const authController = {
  // Register new user
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userExists = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
        [name, email, hashedPassword, "patient"]
      );

      // Generate JWT token
      const token = jwt.sign(
        {
          id: newUser.rows[0].id,
          role: newUser.rows[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.rows[0].id,
          name: newUser.rows[0].name,
          email: newUser.rows[0].email,
          role: newUser.rows[0].role,
        },
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  async registerAdmin(req, res) {
    try {
      const { name, email, password, adminSecret } = req.body;

      // Verify admin secret key
      if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Invalid admin secret key" });
      }

      // Check if user already exists
      const userExists = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new admin user
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
        [name, email, hashedPassword, "admin"]
      );

      const token = jwt.sign(
        {
          id: newUser.rows[0].id,
          role: newUser.rows[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "Admin registered successfully",
        user: {
          id: newUser.rows[0].id,
          name: newUser.rows[0].name,
          email: newUser.rows[0].email,
          role: newUser.rows[0].role,
        },
        token,
      });
    } catch (error) {
      console.error("Admin registration error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password_hash
      );

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.rows[0].id,
          role: user.rows[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  },

  // Get current user profile
  async getProfile(req, res) {
    try {
      const user = await pool.query(
        "SELECT id, name, email, role FROM users WHERE id = $1",
        [req.user.id]
      );

      if (user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.rows[0]);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ message: "Server error while fetching profile" });
    }
  },
};

module.exports = authController;

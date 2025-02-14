require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Ensures compatibility with Railway/PostgreSQL hosting
});

// Test database connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch(err => {
      console.error("Database connection error", err);
      process.exit(1); // Stop the server if DB fails
  });


// Example API Route to Test Backend
app.get("/", (req, res) => {
    res.send("🚀 Teen Taskr Backend is Running!");
});

// Example API Endpoint to Test DB Connection
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Database connected!", time: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

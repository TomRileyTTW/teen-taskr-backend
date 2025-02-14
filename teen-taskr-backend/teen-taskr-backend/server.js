require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
});

// Test database connection
(async () => {
    try {
        await pool.connect();
        console.log("✅ Connected to PostgreSQL Database");
    } catch (err) {
        console.error("❌ Database connection error:", err.stack);
    }
})();

// Example Route to Test API
app.get("/", (req, res) => {
    res.send("✅ Teen Taskr Backend is Running!");
});

// Example API Endpoint (Modify as Needed)
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "✅ Database connected!", time: result.rows[0].now });
    } catch (err) {
        console.error("❌ Database query error:", err.message);
        res.status(500).send("Server Error");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

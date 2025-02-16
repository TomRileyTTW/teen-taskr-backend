require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false } // Enables SSL for production
});

// ✅ Verify database connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL Database"))
    .catch(err => console.error("❌ Database connection error:", err.stack));

// ✅ Test root route (ensures the backend is working)
app.get("/", (req, res) => {
    res.send("🚀 Teen Taskr Backend is Running!");
});

// ✅ Test database route (Ensure database connectivity)
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "✅ Database connected!", time: result.rows[0] });
    } catch (err) {
        console.error("❌ Error fetching from DB:", err.message);
        res.status(500).send("Server Error");
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

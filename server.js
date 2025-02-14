// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// ✅ Root Route - Basic Test Endpoint
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

// ✅ Users Route - Dummy Users API
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];
  res.json(users);
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

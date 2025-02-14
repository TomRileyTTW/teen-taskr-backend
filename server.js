require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json()); // Allows JSON parsing
app.use(cors()); // Enables Cross-Origin Resource Sharing

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

// ✅ Users Route
app.get("/api/users", (req, res) => {
  try {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  

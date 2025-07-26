// Load env variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");

// Local modules
const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const incomeRoutes = require("../routes/incomeRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

// Create express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Optional: test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel backend!" });
});

// Export for Vercel
module.exports.handler = serverless(app);

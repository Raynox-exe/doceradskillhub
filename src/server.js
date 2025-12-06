// ================================
// 📌 Docerad SkillHub - Server.js
// Production Ready Express Server
// ================================

// Core Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// 📌 Security & Performance Middleware
// ================================
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Allow APIs
app.use(compression()); // Compress responses
app.use(morgan("combined")); // Logging (production friendly)

// Rate Limiting - Prevent Abuse
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Max 200 requests
    message: "Too many requests, please try again later.",
  })
);

// ================================
// 📌 Body Parser
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// 📌 View Engine (EJS)
// ================================
app.engine("ejs", ejsMate); // use ejs-mate
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================================
// 📌 Static Files
// ================================
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// ================================
// 📌 MongoDB Connection
// ================================
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/docerad", {
    autoIndex: false,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

// ================================
// 📌 Basic Test Route
// ================================
app.get("/", (req, res) => {
  res.render("pages/index", {
    message: "Docerad SkillHub API is running...",
    title: "Docerad SkillHub",
  });
});

// ================================
// 📌 Routes Import
// ================================
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

// ================================
// 📌 404 Handler
// ================================
app.use((req, res, next) => {
  res.status(404).send("404", { title: "Page Not Found" });
});

// ================================
// 📌 Global Error Handler
// ================================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

// ================================
// 📌 Start Server
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Production Server Running → http://localhost:${PORT}`);
});

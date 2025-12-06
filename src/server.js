// ================================
// 📌 Docerad SkillHub - Server.js
// Production + Vercel Ready Server
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
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("combined"));

// Rate Limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests, try again later.",
  })
);

// ================================
// 📌 Body Parser
// ================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// 📌 View Engine (EJS + ejs-mate)
// ================================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================================
// 📌 Static Files (Vercel Compatible)
// ================================
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================================
// 📌 Database Connection (Fix for Vercel)
// ================================
if (!global._mongooseConnected) {
  mongoose
    .connect(process.env.MONGODB_URI, { autoIndex: false })
    .then(() => {
      console.log("✅ MongoDB Connected");
      global._mongooseConnected = true;
    })
    .catch((err) => console.error("❌ MongoDB Error:", err));
}

// ================================
// 📌 Basic Route
// ================================
app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Docerad SkillHub",
    message: "Docerad SkillHub API running...",
  });
});

// ================================
// 📌 Routes Import
// ================================
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/admin", require("./routes/admin"));

// ================================
// 📌 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Page Not Found" });
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
// 📌 EXPORT FOR VERCEL
// ================================
module.exports = app;

// ================================
// 📌 Local Development Server
// (Vercel will NOT run this part)
// ================================
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Dev Server → http://localhost:${PORT}`);
  });
}

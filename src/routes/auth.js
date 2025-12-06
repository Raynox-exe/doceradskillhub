const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login - Docerad SkillHub" });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    // Create token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res
          .status(201)
          .json({ token, message: "User registered successfully" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          role: user.role,
          message: "Login successful",
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// TEMPORARY: Route to make user admin
router.get("/make-admin", async (req, res) => {
  try {
    const email = "Danielsunny47@gmail.com";
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send(`User with email ${email} not found. Please sign up first.`);
    }

    user.role = "admin";
    await user.save();
    res.send(
      `<h1>Success!</h1><p>User <strong>${email}</strong> has been upgraded to <strong>Admin</strong>.</p><p><a href="http://127.0.0.1:5500/login2/login2.html">Go to Login</a></p>`
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: " + err.message);
  }
});

module.exports = router;

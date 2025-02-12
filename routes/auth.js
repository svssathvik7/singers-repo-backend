const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create new user
    const user = await User.create({ username, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user and check password
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

module.exports = router;

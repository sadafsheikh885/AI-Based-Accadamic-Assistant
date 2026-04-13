const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, admissionNumber, role } = req.body;

    // Student must have admission number
    if (role === "Student" && (!admissionNumber || admissionNumber.trim() === "")) {
      return res.status(400).json({
        message: "Admission Number is required for students"
      });
    }

    // Faculty/Admin should not store empty string
    if (!admissionNumber || admissionNumber.trim() === "") {
      admissionNumber = null;
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const user = new User({
      name,
      email,
      password,
      admissionNumber,
      role
    });

    await user.save();

    res.status(201).json({
      message: `${role} registered successfully`
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ⚡ ADD THIS LINE
module.exports = router;


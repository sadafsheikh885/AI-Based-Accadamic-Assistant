const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

/* -------- Create Timetable -------- */
router.post("/create", async (req, res) => {
  try {
    const { department, semester, times, timetable } = req.body;

    const newTimetable = new Timetable({
      department,
      semester,
      times,
      timetable,
    });

    await newTimetable.save();

    res.status(201).json({
      message: "Timetable created successfully ✅",
      data: newTimetable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save timetable ❌" });
  }
});

/* -------- Get All Timetables -------- */
router.get("/", async (req, res) => {
  try {
    const data = await Timetable.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching timetables ❌" });
  }
});

module.exports = router;
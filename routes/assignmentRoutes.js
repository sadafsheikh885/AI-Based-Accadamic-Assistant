const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const upload = require("../middleware/upload");

/* ================= CREATE ASSIGNMENT ================= */
router.post("/", async (req, res) => {
  try {
    const { title, subject, dueDate } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ error: "All fields required" });
    }

    const assignment = new Assignment({
      title,
      subject,
      dueDate,
      submissions: [],
    });

    await assignment.save();
    res.json(assignment);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: "Create failed" });
  }
});

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const data = await Assignment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* ================= SUBMIT ================= */
router.post("/submit/:id", upload.single("file"), async (req, res) => {
  try {
    const { studentName } = req.body;

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File missing" });
    }

    assignment.submissions.push({
      studentName,
      fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      submittedAt: new Date(),
    });

    await assignment.save();

    res.json({ success: true });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ error: "Submission failed" });
  }
});

/* ================= EXTEND DEADLINE ================= */
router.put("/extend/:id", async (req, res) => {
  try {
    const { dueDate } = req.body;

    if (!dueDate) {
      return res.status(400).json({ error: "Date required" });
    }

    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      { dueDate },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("EXTEND ERROR:", err);
    res.status(500).json({ error: "Extend failed" });
  }
});

/* ================= DELETE (🔥 FIXED ROUTE) ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});
module.exports = router;
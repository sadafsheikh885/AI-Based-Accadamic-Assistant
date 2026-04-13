const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const upload = require("../middleware/upload");

/* -------- GET ALL -------- */
router.get("/", async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
});

/* -------- UPLOAD RESOURCE -------- */
router.post("/", upload.single("file"), async (req, res) => {
  try {
   

    const newResource = new Resource({
      title: req.body.title,
      desc: req.body.desc,
      uploadedBy: req.body.uploadedBy,   // ⭐⭐⭐ MAIN FIX
      type: req.body.type,
      fileName: req.file.originalname,
      filePath: "/uploads/" + req.file.filename,
    });

    await newResource.save();
    res.status(201).json(newResource);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
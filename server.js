const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: "./.env" });

const { GoogleGenAI } = require("@google/genai");
const upload = require("./middleware/upload");

const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const xlsx = require("xlsx");

const app = express();


/* -------- Middleware -------- */
app.use(cors());
app.use(express.json());

/* -------- Static Folder -------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------- DEBUG API KEY -------- */
console.log("API KEY:", process.env.GEMINI_API_KEY);

/* -------- GEMINI SETUP -------- */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* -------- MongoDB Connection -------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Failed ❌", err));

/* -------- ROUTES -------- */
const resourceRoutes = require("./routes/resourceRoutes");
const authRoutes = require("./routes/routes");
const timetableRoutes = require("./routes/timetableRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");


app.use("/api/resources", resourceRoutes);
app.use("/api", authRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/assignments", assignmentRoutes);

/* -------- LOCAL CHATBOT -------- */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message missing" });
    }

    const prompt = `
You are an AI assistant for a college system.

Help with:
- assignments
- study planner
- timetable
- academic questions
Answer in clean format using:
- bullet points
- headings
- short paragraphs

Answer clearly and simply.

User: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ reply: response.text });

  } catch (error) {
    console.error("CHAT AI ERROR:", error);
    res.status(500).json({ reply: "⚠️ AI error" });
  }
});
/* -------- AI STUDY PLAN (TEXT) -------- */
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { subject, notes, days } = req.body;

    if (!subject || !notes || !days) {
      return res.status(400).json({ error: "Missing data" });
    }

    const prompt = `
You must strictly follow this format.

STUDY PLAN:
Day 1:
Day 2:
...

QUIZ:
1.
2.
3.
4.
5.

Subject: ${subject}

Notes:
${notes}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -------- AI STUDY PLAN (FILE) -------- */
app.post("/api/generate-plan-file", upload.single("file"), async (req, res) => {
  try {
    const { subject, days } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let extractedText = "";

    /* PDF */
    if (file.mimetype === "application/pdf") {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      extractedText = data.text;
    }

    /* WORD */
    else if (file.originalname.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: file.path });
      extractedText = result.value;
    }

    /* EXCEL */
    else if (file.originalname.endsWith(".xlsx")) {
      const workbook = xlsx.readFile(file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      extractedText = xlsx.utils.sheet_to_csv(sheet);
    }

    /* TEXT */
    else if (file.mimetype === "text/plain") {
      extractedText = fs.readFileSync(file.path, "utf-8");
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const prompt = `
Create a ${days}-day study plan and quiz.

Subject: ${subject}

Notes:
${extractedText}

Generate:
- Day-wise plan
- 5 quiz questions
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ result: response.text });
  } catch (error) {
    console.error("FILE AI ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -------- FILE UPLOAD -------- */
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("FILE RECEIVED:", req.file);

  res.json({
    filename: req.file.filename,
    path: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

/* -------- CONTACT -------- */
app.post("/api/contact", (req, res) => {
  console.log("Contact Message:", req.body.message);
  res.json({ success: true });
});

/* -------- TEST AI -------- */
app.get("/test-ai", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain Big Data in 3 lines",
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("TEST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -------- ROOT -------- */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* -------- SERVER START -------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

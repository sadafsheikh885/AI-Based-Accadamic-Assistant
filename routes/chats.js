import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(`
You are an AI assistant for a college management system.

Help with:
- assignments
- study planner
- timetable
- academic questions

User question: ${message}
    `);

    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      reply: "⚠️ AI error. Try again.",
    });
  }
});

export default router;
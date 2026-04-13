import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatBot from "../components/ChatBot";
import { askAIHelp, sendMessage } from "../api/api";

export default function Help() {
  const [search, setSearch] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [message, setMessage] = useState("");

  /* FAQs */
  const faqs = [
    {
      question: "How to use Study Planner?",
      answer:
        "Go to Study Planner, enter subject, days and notes. AI will generate a plan.",
    },
    {
      question: "How to upload resources?",
      answer:
        "Go to Resources page and upload your notes in PDF, Word or Excel.",
    },
    {
      question: "How to track assignments?",
      answer:
        "Assignments page shows all tasks with deadlines and status.",
    },
    {
      question: "Notifications not showing?",
      answer:
        "Make sure you created notification or refresh the page.",
    },
  ];

  /* Features */
  const features = [
    {
      title: "📚 Assignments",
      desc: "Manage your assignments and track deadlines easily.",
    },
    {
      title: "🧠 Study Planner",
      desc: "Generate AI-powered study plans based on your syllabus.",
    },
    {
      title: "📁 Resources",
      desc: "Upload and access your study materials anytime.",
    },
    {
      title: "🔔 Notifications",
      desc: "Stay updated with announcements and deadlines.",
    },
  ];

  /* Suggestions */
  const suggestions = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Help Center
      </Typography>

      {/* 🔍 SEARCH */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 3, boxShadow: 3 }}>
        <TextField
          fullWidth
          placeholder="🔍 Search your problem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Suggestions */}
        {search && suggestions.length > 0 && (
          <Paper sx={{ p: 1, mb: 2 }}>
            {suggestions.map((s, i) => (
              <Typography
                key={i}
                sx={{ cursor: "pointer", p: 1 }}
                onClick={() => setSearch(s.question)}
              >
                🔎 {s.question}
              </Typography>
            ))}
          </Paper>
        )}

        {/* AI BUTTON */}
        <Button
          variant="contained"
          onClick={async () => {
            if (!search) return alert("Type something");

            setLoadingAI(true);
            try {
              const reply = await askAIHelp(search);
              setAiAnswer(reply);
            } catch {
              alert("AI not working");
            }
            setLoadingAI(false);
          }}
        >
          {loadingAI ? "Thinking..." : "Ask AI"}
        </Button>
      </Paper>

      {/* 🤖 AI ANSWER */}
      {aiAnswer && (
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography fontWeight="bold">🤖 AI Answer:</Typography>
          <Typography>{aiAnswer}</Typography>
        </Paper>
      )}

      {/* ❓ FAQs */}
      <Typography variant="h6" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* 📚 FEATURES */}
      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Features Guide
      </Typography>

      <Grid container spacing={2}>
        {features.map((f, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <Typography fontWeight="bold">{f.title}</Typography>
              <Typography>{f.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 🤖 CHATBOT */}
      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        AI Help Assistant
      </Typography>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography>
          Use the chatbot at the bottom-right corner to ask anything.
        </Typography>
      </Paper>

      {/* 📩 CONTACT */}
      <Typography variant="h6" gutterBottom>
        Contact Support
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <TextField
          fullWidth
          label="Your Message"
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={async () => {
            try {
              await sendMessage(message);
              alert("Message sent ✅");
              setMessage("");
            } catch {
              alert("Failed to send");
            }
          }}
        >
          Send Message
        </Button>
      </Paper>

      <ChatBot />
    </Box>
  );
}
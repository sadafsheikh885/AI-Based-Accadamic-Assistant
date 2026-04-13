import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";

import {
  generateStudyPlan,
  generateStudyPlanFromFile,
} from "../api/api";

export default function Planner() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [days, setDays] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [quiz, setQuiz] = useState("");

  /* ===================== GENERATE PLAN ===================== */
  const generatePlan = async () => {
    if (!subject || !days) {
      alert("Please enter subject and days");
      return;
    }

    setLoading(true);

    try {
      let result = "";

      /* FILE MODE */
      if (file) {
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("days", days);
        formData.append("file", file);

        result = await generateStudyPlanFromFile(formData);
      }

      /* TEXT MODE */
      else {
        if (!notes) {
          alert("Please enter notes or upload file");
          setLoading(false);
          return;
        }

        result = await generateStudyPlan(subject, notes, days);
      }

      /* CLEAN SPLIT */
      const planMatch = result.match(/STUDY PLAN:\s*([\s\S]*?)QUIZ:/i);
      const quizMatch = result.match(/QUIZ:\s*([\s\S]*)/i);

      setPlan(planMatch ? planMatch[1].trim() : "No plan generated");
      setQuiz(quizMatch ? quizMatch[1].trim() : "No quiz generated");

    } catch (error) {
      console.error(error);
      alert("AI generation failed");
    }

    setLoading(false);
  };

  /* ===================== STYLES ===================== */

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "40px",
      background: isDark ? "#020617" : "#f5f3ff",
    },

    card: {
      background: "linear-gradient(135deg, #7c3aed, #6d28d9, #5b21b6)",
      borderRadius: "40px",
      padding: "30px",
      maxWidth: "900px",
      margin: "auto",
      boxShadow: "0 20px 60px rgba(124, 58, 237, 0.5)",
      color: "#fff",
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#fff",
    },

    input: {
      marginBottom: "15px",
      background: "#f3f4f6",
      borderRadius: "12px",
    },

    btn: {
      padding: "10px 18px",
      background: "linear-gradient(135deg, #2563eb, #4f46e5)",
      color: "#fff",
      borderRadius: "12px",
      fontWeight: "600",
      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.5)",
    },

    section: {
      background: "#fff",
      borderRadius: "20px",
      padding: "20px",
      marginTop: "20px",
      color: "#000",
    },

    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
    },
  };

  /* ===================== UI ===================== */

  return (
    <Box sx={styles.container}>
      <Box sx={styles.card}>

        <Typography sx={styles.title}>
           Smart Study Planner
        </Typography>

        {/* INPUT SECTION */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: "20px" }}>

          <TextField
            fullWidth
            label="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={styles.input}
          />

          <TextField
            fullWidth
            label="Number of Study Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            sx={styles.input}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Paste Notes / Syllabus (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={styles.input}
          />

          {/* FILE UPLOAD */}
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginBottom: "15px", color: "black" }}
          />

          {/* BUTTON */}
          <Button
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            onClick={generatePlan}
            disabled={loading}
            sx={styles.btn}
          >
            {loading ? "Generating AI Plan..." : "Generate AI Study Plan"}
          </Button>

        </Paper>

        {/* STUDY PLAN */}
        {plan && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>
               Study Plan
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ReactMarkdown>{plan}</ReactMarkdown>
          </Box>
        )}

        {/* QUIZ */}
        {quiz && (
          <Box sx={styles.section}>
            <Typography sx={styles.sectionTitle}>
               Quiz
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ReactMarkdown>{quiz}</ReactMarkdown>
          </Box>
        )}

      </Box>
    </Box>
  );
}
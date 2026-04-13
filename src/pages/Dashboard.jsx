import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Paper,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import penguin from "../asset/penguin.png";

export default function Dashboard({ setPage }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);

  const user = JSON.parse(localStorage.getItem("acedamix_user")) || {};

  // ✅ LOAD EVERYTHING FROM LOCAL STORAGE
  useEffect(() => {
    const storedAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    const storedResources =
      JSON.parse(localStorage.getItem("resources")) || [];

    setAssignments(storedAssignments);
    setResources(storedResources);
  }, []);

  // ✅ SIMPLE (NO COMPLEX FILTER FOR NOW)
  const pendingAssignments = assignments;

  const recentResources = resources.slice(0, 3);

  const cards = [
    {
      title: "Assignments",
      value: `${pendingAssignments.length} Pending`,
      icon: <AssignmentIcon />,
      page: "assignments",
    },
    {
      title: "Resources",
      value: `${resources.length} Files`,
      icon: <BookIcon />,
      page: "resources",
    },
    {
      title: "Study Planner",
      value: "AI Enabled",
      icon: <AutoGraphIcon />,
      page: "planner",
    },
  ];

  return (
    <Box
      sx={{
        px: 2,
        background: isDark ? "#020617" : "#faf7ff",
        minHeight: "100vh",
      }}
    >
      {/* 🌟 HERO */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          borderRadius: "24px",
          p: 6,
          mb: 5,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(139,92,246,0.35)",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Welcome back 👋
        </Typography>

        <Typography sx={{ opacity: 0.9 }}>
          Stay productive with <b>ACEDAMIX</b>
        </Typography>

        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            background: "#a78bfa",
            filter: "blur(120px)",
            top: -50,
            right: -50,
            opacity: 0.4,
          }}
        />

        <Box
          component="img"
          src={penguin}
          sx={{
            position: "absolute",
            right: 80,
            bottom: -20,
            height: 220,
          }}
        />
      </Box>

      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back to ACEDAMIX
      </Typography>

      {/* CARDS */}
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              onClick={() => setPage(card.page)}
              sx={{
                cursor: "pointer",
                borderRadius: "20px",
                background: isDark
                  ? "rgba(15,23,42,0.7)"
                  : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Box>

                <Typography fontWeight={700}>{card.title}</Typography>
                <Typography variant="body2">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 📌 ASSIGNMENTS */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          ⏳ Pending Assignments
        </Typography>

        {pendingAssignments.length === 0 ? (
          <Typography>No assignments available</Typography>
        ) : (
          pendingAssignments.map((a, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
              <Typography fontWeight="bold">📘 {a.title}</Typography>
              <Typography>{a.subject}</Typography>
              <Typography fontSize="13px">
                ⏰ {a.dueDate || "No date"}
              </Typography>
            </Paper>
          ))
        )}
      </Box>

      {/* 📂 RESOURCES */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          📂 Recently Added Resources
        </Typography>

        {recentResources.length === 0 ? (
          <Typography>No recent resources</Typography>
        ) : (
          recentResources.map((r) => (
            <Paper key={r.url} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
              <Typography fontWeight="bold">📄 {r.title}</Typography>
              <Typography color="text.secondary">
                {r.description || "No description"}
              </Typography>

              <a href={r.url} target="_blank" rel="noreferrer">
                View File
              </a>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
}
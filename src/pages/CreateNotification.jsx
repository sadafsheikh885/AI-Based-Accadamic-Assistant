import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

export default function CreateNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("announcement");
  const [deadline, setDeadline] = useState("");

  // ✅ FIXED ROLE (IMPORTANT)
  const user = JSON.parse(localStorage.getItem("acedamix_user")) || {};
  const role = user?.role || "Student";

  console.log("ROLE:", role);

  const handleCreate = () => {
    if (!title || !message) {
      alert("Fill all fields");
      return;
    }

    const newNotification = {
      title,
      message,
      type,
      deadline: type === "deadline" ? deadline : null,
      time: new Date().toLocaleString(),
    };

    const old =
      JSON.parse(localStorage.getItem("notifications")) || [];

    localStorage.setItem(
      "notifications",
      JSON.stringify([newNotification, ...old])
    );

    alert("Notification Created ✅");

    setTitle("");
    setMessage("");
    setDeadline("");
  };

  // ❌ STUDENT VIEW
  if (role === "Student") {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          🔔 Notifications
        </Typography>

        <Typography mt={3} color="text.secondary">
          You can only view notifications.
        </Typography>
      </Box>
    );
  }

  // ✅ FACULTY VIEW (UNCHANGED UI)
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📢 Create Notification
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg,#7b2ff7,#9f5cfb)",
          color: "#fff",
        }}
      >
        <TextField
          fullWidth
          label="Title"
          sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <TextField
          select
          fullWidth
          label="Type"
          sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="announcement">Announcement</MenuItem>
          <MenuItem value="deadline">Deadline</MenuItem>
          <MenuItem value="notice">Notice</MenuItem>
        </TextField>

        {type === "deadline" && (
          <TextField
            fullWidth
            type="datetime-local"
            label="Deadline Time"
            sx={{ mb: 2, bgcolor: "#fff", borderRadius: 2 }}
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        )}

        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#6a2de2",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#eee",
            },
          }}
          onClick={handleCreate}
        >
          Create Notification
        </Button>
      </Paper>
    </Box>
  );
}
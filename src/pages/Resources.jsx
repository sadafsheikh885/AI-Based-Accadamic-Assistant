import { useState, useEffect } from "react";
import { uploadFile } from "../api/api";

import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

export default function Resources() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);

  // Load resources
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("resources")) || [];
    setResources(stored);
  }, []);

  const handleUpload = async () => {
    if (!title || !file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadFile(formData);

    const newResource = {
      id: Date.now(),
      title,
      description,
      url: res.path,
    };

    const updated = [newResource, ...resources];

    setResources(updated);
    localStorage.setItem("resources", JSON.stringify(updated));

    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <Box sx={{ p: 3, background: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📁 Academic Resources
      </Typography>

      {/* 🔥 UPLOAD CARD */}
      <Box
        sx={{
          p: 4,
          borderRadius: 6,
          mb: 4,
          background: "linear-gradient(135deg, #7b2ff7, #9f5cfb)",
          color: "white",
          boxShadow: 5,
        }}
      >
        <Typography variant="h6" mb={2}>
          Upload New Resource
        </Typography>

        {/* TITLE */}
        <TextField
          fullWidth
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
            background: "#fff",
            borderRadius: 5,
          }}
        />

        {/* FILE BUTTON */}
        <Button
          variant="contained"
          component="label"
          sx={{
            mb: 2,
            borderRadius: 5,
            background: "#e0e7ff",
            color: "#4f46e5",
            textTransform: "none",
            px: 3,
          }}
        >
          📎 Upload File
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        {/* DESCRIPTION */}
        <TextField
          fullWidth
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            mb: 2,
            background: "#fff",
            borderRadius: 5,
          }}
        />

        {/* UPLOAD BUTTON */}
        <Button
          onClick={handleUpload}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#fff",
            textTransform: "none",
          }}
        >
          Upload File
        </Button>
      </Box>

      {/* 📂 AVAILABLE RESOURCES */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 6,
          background: "#f9fafb",
        }}
      >
        <Typography variant="h6" mb={2}>
          Available Resources
        </Typography>

        {resources.length === 0 ? (
          <Typography>No resources uploaded yet.</Typography>
        ) : (
          <List>
            {resources.map((res) => (
              <ListItem
                key={res.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <ListItemText
                  primary={`📄 ${res.title}`}
                  secondary={res.description}
                />

                <Button
                  href={res.url}
                  target="_blank"
                  sx={{
                    mt: 1,
                    color: "#4f46e5",
                    textTransform: "none",
                  }}
                >
                  Open File
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
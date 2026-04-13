import { useState } from "react";
import Girl from "../asset/Girl.jpeg";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Avatar,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

export default function Community() {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [posts, setPosts] = useState([
    {
      name: "Faculty Admin",
      role: "Faculty",
      text: "Please submit all assignments before the deadline.",
    },
    {
      name: "Student",
      role: "Student",
      text: "Can someone explain normalization in DBMS?",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) {
      alert("Please write something");
      return;
    }

    setPosts([
      ...posts,
      {
        name: "You",
        role: "Student",
        text: newPost,
      },
    ]);

    setNewPost("");
  };

  return (

    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: isDark ? "#000000" : "#f9f4ff",
      }}
    >

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Student Community Forum
      </Typography>


      {/* POST INPUT CARD */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: isDark
            ? "#111"
            : "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          color: "#fff",
          boxShadow: isDark
            ? "0 10px 25px rgba(0,0,0,0.7)"
            : "0 15px 35px rgba(124,58,237,0.35)",
        }}
      >

        <Typography variant="h6" gutterBottom>
          Start a Discussion
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Ask a doubt or share something..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          sx={{
            mb: 2,
            background: "#fff",
            borderRadius: 1,
          }}
        />

        <Button
          variant="contained"
          onClick={handlePost}
          sx={{
            background: "#271cea",
            "&:hover": { background: "#4d45a7" },
          }}
        >
          Post
        </Button>

      </Paper>


      {/* POSTS */}
      {posts.map((post, index) => (

        <Paper
          key={index}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 3,
            background: isDark
              ? "#111"
              : "linear-gradient(135deg,#8b5cf6,#7c3aed)",
            color: "#fff",
            boxShadow: isDark
              ? "0 8px 20px rgba(0,0,0,0.6)"
              : "0 10px 25px rgba(124,58,237,0.35)",
          }}
        >

          <Box display="flex" alignItems="center" mb={1}>

            <Avatar sx={{ mr: 2 }}>
              {post.name.charAt(0)}
            </Avatar>

            <Box>
              <Typography fontWeight="bold">
                {post.name}
              </Typography>

              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {post.role}
              </Typography>
            </Box>

          </Box>

          <Divider
            sx={{
              mb: 2,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          />

          <Typography>
            {post.text}
          </Typography>

        </Paper>

      ))}

    </Box>
  );
}
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  // ✅ Fresh chat every time
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hi , I'm your AI Assistant \n\nAsk me anything ",
      },
    ]);
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || typing) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const botMsg = {
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again later." },
      ]);
    }

    setTyping(false);
  };

  return (
    <>
      {/* 🌸 Floating Button */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "white",
          zIndex: 2000,
          boxShadow: 4,
          "&:hover": {
            background: "linear-gradient(135deg, #5a0fbf, #1f63e0)",
          },
        }}
      >
        <ChatIcon />
      </IconButton>

      {/* 💬 Chat Window */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={12}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            overflow: "hidden",
            zIndex: 2000,
            background: "#ffffff",
          }}
        >
          {/* 🌈 Header */}
          <Box
            sx={{
              p: 1.5,
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight={600}>
              AI Assistant 🤖
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 💬 Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              background: "#f9f9ff",
            }}
          >
            {messages.map((m, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent={
                  m.sender === "user" ? "flex-end" : "flex-start"
                }
                mb={1.5}
                gap={1}
              >
                {m.sender === "bot" && (
                  <span style={{ fontSize: "18px" }}>🤖</span>
                )}

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    maxWidth: "75%",
                    background:
                      m.sender === "user"
                        ? "linear-gradient(135deg, #6a11cb, #2575fc)"
                        : "#ffffff",
                    color: m.sender === "user" ? "#fff" : "#333",
                    boxShadow: 2,
                    fontSize: "0.9rem",
                  }}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </Box>
              </Box>
            ))}

            {typing && (
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                🤖 Typing...
              </Typography>
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* ✏️ Input */}
          <Box
            sx={{
              p: 1,
              display: "flex",
              gap: 1,
              borderTop: "1px solid #eee",
              background: "#fff",
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              sx={{
                "& fieldset": { borderRadius: 3 },
              }}
            />

            <IconButton
              onClick={sendMessage}
              disabled={typing}
              sx={{
                background: "#2575fc",
                color: "white",
                "&:hover": { background: "#1f63e0" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}
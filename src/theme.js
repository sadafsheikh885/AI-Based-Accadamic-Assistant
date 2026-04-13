import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#5b5be0",
      },
      secondary: {
        main: "#8f8cf6",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f5f6fa",
        paper: mode === "dark" ? "#020617" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e5e7eb" : "#111827",
        secondary: mode === "dark" ? "#9ca3af" : "#6b7280",
      },
    },
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "10px 18px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow:
              mode === "dark"
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 25px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });

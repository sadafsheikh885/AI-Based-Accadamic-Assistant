import { useState } from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { getTheme } from "./theme";

/* Pages */
import Animat from "./pages/Animat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Resources from "./pages/Resources";
import Planner from "./pages/Planner";
import Community from "./pages/Community";
import Timetable from "./pages/Timetable";
import Notifications from "./pages/Notifications";
import CreateNotification from "./pages/CreateNotification";
import Help from "./pages/Help";

/* Components */
import ChatBot from "./components/ChatBot";
import Layout from "./components/Layout";

export default function App() {
  // 🔹 STATE
  const [page, setPage] = useState("animat");
  const [mode, setMode] = useState("light");

  const [userName, setUserName] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = getTheme(mode);

  // --------------------------------------------------------
  // 🔹 LOGIN HANDLER (🔥 MAIN FIX)
  // --------------------------------------------------------
  const handleLogin = (data) => {
    if (data) {
      setUserName(data.name || "");
      setUserClass(data.classBatch || "");
    }

    setPage("dashboard"); // ✅ DIRECTLY GO TO DASHBOARD
  };

  // --------------------------------------------------------
  // 🔹 ONBOARDING FLOW
  // --------------------------------------------------------
  const isOnboarding = ["animat", "login", "register"].includes(page);

  if (isOnboarding) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Theme Button */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 1500,
            bgcolor: "background.paper",
            boxShadow: 4,
          }}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {page === "animat" && (
          <Animat goToLogin={() => setPage("login")} />
        )}

        {page === "login" && (
          <Login
            onLogin={handleLogin} // ✅ FIXED
            onRegister={() => setPage("register")}
          />
        )}

        {page === "register" && (
          <Register
            onRegister={() => setPage("login")}
            onBack={() => setPage("login")}
          />
        )}
      </ThemeProvider>
    );
  }

  // --------------------------------------------------------
  // 🔹 MAIN APP
  // --------------------------------------------------------
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Theme Button */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 1500,
          bgcolor: "background.paper",
          boxShadow: 4,
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Layout
        setPage={setPage}
        page={page}
        mode={mode}
        toggleTheme={toggleTheme}
        userName={userName}
        userClass={userClass}
        userPhoto={userPhoto}
        setUserPhoto={setUserPhoto}
      >
        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "assignments" && <Assignments />}
        {page === "resources" && <Resources />}
        {page === "planner" && <Planner />}
        {page === "community" && <Community />}
        {page === "timetable" && <Timetable />}
        {page === "notifications" && <Notifications />}
        {page === "createNotification" && <CreateNotification />}
        {page === "help" && <Help />}
        {page === "chatbot" && <ChatBot setPage={setPage} />}

        {/* fallback */}
        {![
          "dashboard",
          "assignments",
          "resources",
          "planner",
          "community",
          "timetable",
          "notifications",
          "createNotification",
          "help",
          "chatbot",
        ].includes(page) && <Dashboard setPage={setPage} />}
      </Layout>

      {/* Floating chatbot */}
      {page !== "chatbot" && <ChatBot />}
    </ThemeProvider>
  );
}
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import { useState } from "react";
import bgImage from "../asset/Login.jpeg";

export default function Login({ onLogin, onRegister }) {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState("Student");

  const [name, setName] = useState("");
  const [admission, setAdmission] = useState("");
  const [classBatch, setClassBatch] = useState("");

  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = () => {
    if (!name) return alert("Enter name");

    if (role === "Student" && (!admission || !classBatch)) {
      return alert("Fill student details");
    }

    if (role === "Faculty" && (!facultyId || !department)) {
      return alert("Fill faculty details");
    }

  const userData = {
  name: name.trim(), // ✅ FIX
  role,
  admission,
  classBatch,
  facultyId,
  department,
};

localStorage.setItem("acedamix_user", JSON.stringify(userData));

    // ✅ IMPORTANT: TRIGGER APP FLOW
    onLogin(userData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 3, md: 10 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          width: 420,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        {!showForm ? (
          <>
            {/* ORIGINAL UI */}
            <Typography variant="h4" mb={4}>
              Student Assistant
            </Typography>

            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "25px",
                  py: 1.5,
                  background:
                    "linear-gradient(90deg, #7b2ff7, #9f5cfb)",
                }}
                onClick={() => setShowForm(true)}
              >
                Login
              </Button>

              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "25px",
                  py: 1.5,
                  backgroundColor: "#ede7ff",
                  color: "#6a2de2",
                  "&:hover": {
                    backgroundColor: "#e0d6ff",
                  },
                }}
                onClick={onRegister}
              >
                Register
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {/* PROFILE FORM */}
            <Typography variant="h5" mb={2}>
              Complete Your Profile
            </Typography>

            <Stack spacing={2}>
              <TextField
                placeholder="Full Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Typography>Select Role</Typography>

              <Box display="flex" gap={2}>
                <Button
                  fullWidth
                  onClick={() => setRole("Student")}
                  sx={{
                    background:
                      role === "Student" ? "#7b2ff7" : "#eee",
                    color: role === "Student" ? "#fff" : "#000",
                  }}
                >
                  Student
                </Button>

                <Button
                  fullWidth
                  onClick={() => setRole("Faculty")}
                  sx={{
                    background:
                      role === "Faculty" ? "#7b2ff7" : "#eee",
                    color: role === "Faculty" ? "#fff" : "#000",
                  }}
                >
                  Faculty
                </Button>
              </Box>

              {role === "Student" && (
                <>
                  <TextField
                    placeholder="Admission Number"
                    value={admission}
                    onChange={(e) => setAdmission(e.target.value)}
                  />

                  <TextField
                    placeholder="Class / Batch"
                    value={classBatch}
                    onChange={(e) => setClassBatch(e.target.value)}
                  />
                </>
              )}

              {role === "Faculty" && (
                <>
                  <TextField
                    placeholder="Faculty ID"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                  />

                  <TextField
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </>
              )}

              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg,#5f2c82,#6a11cb)",
                }}
                onClick={handleSubmit}
              >
                Enter Dashboard
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
}
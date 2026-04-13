import { useState, useEffect } from "react";
import bgImage from "../asset/RegistrationTemp.jpeg"
import { registerUser } from "../api/api";;
import "./Register.css";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

export default function Register({ onBack }) {
  const [role, setRole] = useState("Student");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isPasswordValid = password.length >= 6;

  useEffect(() => {
    if (email && !emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    if (password && !isPasswordValid) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }

    const roleValid =
      role === "Student"
        ? admissionNo.trim() !== ""
        : facultyId.trim() !== "";

    if (fullName && emailRegex.test(email) && isPasswordValid && roleValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [fullName, email, password, role, admissionNo, facultyId]);

  const handleRegister = async () => {
    if (!formValid) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          role,
          admissionNumber: role === "Student" ? admissionNo : facultyId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registered successfully ✅");
      onBack();

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div
      className="register-container"
      style={{
        background: `url(${bgImage}) no-repeat center center`,
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 5 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Register
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              label="Email ID"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError || "Minimum 6 characters"}
            />

            {role === "Student" ? (
              <TextField
                label="Admission Number"
                fullWidth
                value={admissionNo}
                onChange={(e) => setAdmissionNo(e.target.value)}
              />
            ) : (
              <TextField
                label="Faculty ID"
                fullWidth
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              />
            )}

            <TextField
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Faculty">Faculty</MenuItem>
            </TextField>

            <Button
              variant="contained"
              size="large"
              disabled={!formValid}
              onClick={handleRegister}
            >
              Register
            </Button>

            <Button variant="text" onClick={onBack}>
              Back to Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
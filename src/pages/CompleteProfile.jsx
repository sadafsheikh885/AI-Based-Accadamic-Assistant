import { useState } from "react";
import { Box, Button, TextField, Typography, Fade } from "@mui/material";
import GirlImage from "../asset/Girl.jpeg";

export default function CompleteProfile({ onComplete }) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  const [admissionNo, setAdmissionNo] = useState("");
  const [classBatch, setClassBatch] = useState("");

  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!fullName || !role) {
      setError("Please complete all the fields.");
      return;
    }

    if (role === "student" && (!admissionNo || !classBatch)) {
      setError("Please complete all student details.");
      return;
    }

    if (role === "faculty" && (!facultyId || !department)) {
      setError("Please complete all faculty details.");
      return;
    }

    setError("");
    onComplete();
  };

  // 🔥 Modern TextField Style
  const textFieldStyle = {
    background: "rgba(255,255,255,0.95)",
    borderRadius: 2,
    transition: "0.3s",
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#ddd"
      },
      "&:hover fieldset": {
        borderColor: "#ffffff"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffffff",
        boxShadow: "0 0 8px rgba(255,255,255,0.6)"
      }
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6c5ce7"
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>

      {/* 🟣 LEFT SIDE */}
      <Box
        sx={{
          width: "50%",
          background: "linear-gradient(135deg, #9e5bbb, #6c5ce7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
          color: "white"
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 450 }}>

          <Typography variant="h4" fontWeight={600} gutterBottom>
            Complete Your Profile
          </Typography>

          <Typography mb={2}>
            Please provide your details.
          </Typography>

          {error && (
            <Typography color="#ffdddd" mb={2}>
              {error}
            </Typography>
          )}

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={textFieldStyle}
          />

          {/* Role Buttons */}
          <Typography mt={2} mb={1} fontWeight={600}>
            Select Role
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant={role === "student" ? "contained" : "outlined"}
              onClick={() => setRole("student")}
              sx={{
                borderColor: "white",
                color: role === "student" ? "#6c5ce7" : "white",
                backgroundColor: role === "student" ? "#fff" : "transparent",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#6c5ce7"
                }
              }}
            >
              Student
            </Button>

            <Button
              fullWidth
              variant={role === "faculty" ? "contained" : "outlined"}
              onClick={() => setRole("faculty")}
              sx={{
                borderColor: "white",
                color: role === "faculty" ? "#6c5ce7" : "white",
                backgroundColor: role === "faculty" ? "#fff" : "transparent",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#6c5ce7"
                }
              }}
            >
              Faculty
            </Button>
          </Box>

          {/* 🔥 Animated Role Fields */}
          <Fade in={role === "student"} timeout={400}>
            <Box>
              {role === "student" && (
                <>
                  <TextField
                    fullWidth
                    label="Admission Number"
                    placeholder="e.g. 2023CS101"
                    margin="normal"
                    value={admissionNo}
                    onChange={(e) => setAdmissionNo(e.target.value)}
                    sx={textFieldStyle}
                  />

                  <TextField
                    fullWidth
                    label="Class / Batch"
                    placeholder="BCA"
                    margin="normal"
                    value={classBatch}
                    onChange={(e) => setClassBatch(e.target.value)}
                    sx={textFieldStyle}
                  />
                </>
              )}
            </Box>
          </Fade>

          <Fade in={role === "faculty"} timeout={400}>
            <Box>
              {role === "faculty" && (
                <>
                  <TextField
                    fullWidth
                    label="Faculty ID"
                    placeholder="e.g. FAC1023"
                    margin="normal"
                    value={facultyId}
                    onChange={(e) => setFacultyId(e.target.value)}
                    sx={textFieldStyle}
                  />

                  <TextField
                    fullWidth
                    label="Department"
                    placeholder="Computer Science"
                    margin="normal"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    sx={textFieldStyle}
                  />
                </>
              )}
            </Box>
          </Fade>

          {/* Submit Button */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#55209a",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#3d1570",
                transform: "translateY(-2px)"
              }
            }}
            onClick={handleSubmit}
          >
            Enter Dashboard
          </Button>

        </Box>
      </Box>

      {/* ⚪ RIGHT SIDE */}
      <Box
        sx={{
          width: "50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
          textAlign: "center"
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight={600} color="#000">
            Welcome!
          </Typography>

          <Typography mt={2} color="#666">
            Complete your profile to continue
          </Typography>

          <Box
            component="img"
            src={GirlImage}
            alt="Profile"
            sx={{
              width: 350,
              mt: 4,
              maxWidth: "100%",
              animation: "float 3s ease-in-out infinite"
            }}
          />
        </Box>
      </Box>

    </Box>
  );
}
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";

export default function Assignments() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const user = JSON.parse(localStorage.getItem("acedamix_user")) || {};
  const role = user?.role || "Student";

  const [assignments, setAssignments] = useState([]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [files, setFiles] = useState({});
  const [message, setMessage] = useState("");

  const [extendOpen, setExtendOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [newDate, setNewDate] = useState("");

  // ✅ LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(stored);
  }, []);

  // ✅ CREATE
  const createAssignment = () => {
    if (!title || !subject) {
      setMessage("⚠️ Fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate: dueDate || new Date().toISOString(),
      submissions: [],
    };

    const stored = JSON.parse(localStorage.getItem("assignments")) || [];
    const updated = [newAssignment, ...stored];

    localStorage.setItem("assignments", JSON.stringify(updated));
    setAssignments(updated);

    setMessage("✅ Assignment Created");

    setTitle("");
    setSubject("");
    setDueDate("");
  };

  // ✅ DELETE
  const deleteAssignment = (id) => {
    const stored = JSON.parse(localStorage.getItem("assignments")) || [];
    const updated = stored.filter((a) => a.id !== id);

    localStorage.setItem("assignments", JSON.stringify(updated));
    setAssignments(updated);
  };

  // ✅ SUBMIT (LOCAL)
  const submitAssignment = (id) => {
    if (!files[id]) {
      setMessage("⚠️ Upload file first");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("assignments")) || [];

    const updated = stored.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          submissions: [
            ...(a.submissions || []),
            {
              studentName: user?.name,
              fileUrl: URL.createObjectURL(files[id]),
            },
          ],
        };
      }
      return a;
    });

    localStorage.setItem("assignments", JSON.stringify(updated));
    setAssignments(updated);

    setMessage("✅ Submitted");
  };

  // ✅ EXTEND
  const extendDeadline = () => {
    const stored = JSON.parse(localStorage.getItem("assignments")) || [];

    const updated = stored.map((a) => {
      if (a.id === selectedId) {
        return { ...a, dueDate: newDate };
      }
      return a;
    });

    localStorage.setItem("assignments", JSON.stringify(updated));
    setAssignments(updated);

    setExtendOpen(false);
    setMessage("✅ Deadline Extended");
  };

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <Box
      sx={{
        p: 3,
        background: isDark ? "#020617" : "#f5f3ff",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📚 Assignments
      </Typography>

      {/* FACULTY CREATE */}
      {role === "Faculty" && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg,#7b2ff7,#9f5cfb)",
            color: "#fff",
          }}
        >
          <Typography variant="h6">Create Assignment</Typography>

          <TextField
            fullWidth
            label="Title"
            sx={{ mt: 2, bgcolor: "#fff" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Subject"
            sx={{ mt: 2, bgcolor: "#fff" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <TextField
            fullWidth
            type="datetime-local"
            sx={{ mt: 2, bgcolor: "#fff" }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "#fff", color: "#6a2de2" }}
            onClick={createAssignment}
          >
            Create Assignment
          </Button>

          {/* ✅ SMALL MESSAGE */}
          {message && (
            <Typography sx={{ mt: 1, fontSize: "13px" }}>
              {message}
            </Typography>
          )}
        </Paper>
      )}

      {assignments.length === 0 && (
        <Typography>No assignments available</Typography>
      )}

      <Grid container spacing={3}>
        {assignments.map((a) => {
          const expired = isExpired(a.dueDate);

          const submitted = a.submissions?.some(
            (s) => s.studentName === user?.name
          );

          return (
            <Grid item xs={12} md={6} key={a.id}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold">{a.title}</Typography>

                  <Chip
                    label={expired ? "Expired" : "Active"}
                    color={expired ? "error" : "success"}
                  />
                </Box>

                <Typography mt={1}>{a.subject}</Typography>

                <Typography fontSize="13px">
                  ⏰ {new Date(a.dueDate).toLocaleString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* STUDENT */}
                {role === "Student" && (
                  <>
                    {submitted && (
                      <Chip label="Submitted" color="success" />
                    )}

                    {!expired && (
                      <>
                        <Button variant="outlined" component="label">
                          Upload File
                          <input
                            type="file"
                            hidden
                            onChange={(e) =>
                              setFiles({
                                ...files,
                                [a.id]: e.target.files[0],
                              })
                            }
                          />
                        </Button>

                        <Button
                          variant="contained"
                          sx={{ mt: 1 }}
                          onClick={() => submitAssignment(a.id)}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </>
                )}

                {/* FACULTY */}
                {role === "Faculty" && (
                  <>
                    <Typography mt={2}>Submissions:</Typography>

                    {a.submissions?.length === 0 && (
                      <Typography>No submissions</Typography>
                    )}

                    {a.submissions?.map((s, i) => (
                      <Box key={i} mt={1}>
                        👤 {s.studentName}
                        <br />
                        <a href={s.fileUrl} target="_blank">
                          View File
                        </a>
                      </Box>
                    ))}

                    <Button
                      sx={{ mt: 1 }}
                      onClick={() => {
                        setSelectedId(a.id);
                        setExtendOpen(true);
                      }}
                    >
                      Extend Deadline
                    </Button>

                    <Button
                      color="error"
                      sx={{ mt: 1 }}
                      onClick={() => deleteAssignment(a.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* EXTEND */}
      <Dialog open={extendOpen} onClose={() => setExtendOpen(false)}>
        <DialogTitle>Extend Deadline</DialogTitle>

        <DialogContent>
          <TextField
            type="datetime-local"
            fullWidth
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setExtendOpen(false)}>Cancel</Button>
          <Button onClick={extendDeadline}>Extend</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";

export default function Notifications() {
  const [data, setData] = useState([]);

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("notifications")) || [];
  setData(stored);

  // 🔔 Sound
 

  // ⏰ Deadline check
  const now = new Date();

  stored.forEach((n) => {
    if (n.type === "deadline" && n.deadline) {
      const deadlineTime = new Date(n.deadline);

      const diff = deadlineTime - now;

      // notify if less than 1 hour remaining
      if (diff > 0 && diff < 60 * 60 * 1000) {
        alert(` Deadline approaching: ${n.title}`);
      }
    }
  });

}, []);
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🔔 Notifications
      </Typography>

      <Paper sx={{ p: 2 }}>
        {data.length === 0 ? (
          <Typography>No notifications yet</Typography>
        ) : (
          <List>
            {data.map((n, i) => (
              <Box key={i}>
                <ListItem>
                  <Box>
                    <Typography fontWeight={600}>
                      {n.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {n.type.toUpperCase()} • {n.time}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      {n.message}
                    </Typography>
                  </Box>
                </ListItem>

                <Divider />
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
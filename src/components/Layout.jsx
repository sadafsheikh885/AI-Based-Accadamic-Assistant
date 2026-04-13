import { useState, useRef, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  ListItem,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useTheme } from "@mui/material/styles";

export default function Layout({
  children,
  page,
  setPage,
  mode,
  toggleTheme,
  userName,
  userClass,
  userPhoto,
  setUserPhoto,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const drawerOpenWidth = 240;
  const drawerClosedWidth = 70;

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasNew, setHasNew] = useState(false);

  const fileInputRef = useRef(null);

  /* 🔴 CHECK NOTIFICATIONS */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("notifications")) || [];
    if (data.length > 0) setHasNew(true);
  }, []);

  /* PROFILE MENU */
  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  /* PHOTO UPLOAD */
  const handlePhotoPick = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserPhoto(reader.result);
      localStorage.setItem("acedamix-photo", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, key: "dashboard" },
    { text: "Assignments", icon: <AssignmentIcon />, key: "assignments" },
    { text: "Resources", icon: <BookIcon />, key: "resources" },
    { text: "Study Planner", icon: <PsychologyIcon />, key: "planner" },
    { text: "Community", icon: <GroupIcon />, key: "community" },
    { text: "Timetable", icon: <EventIcon />, key: "timetable" },
    { text: "Create Notification", icon: <NotificationsIcon />, key: "createNotification" },
    { text: "Help (FAQs)", icon: <HelpOutlineIcon />, key: "help" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerOpenWidth : drawerClosedWidth,
          "& .MuiDrawer-paper": {
            width: open ? drawerOpenWidth : drawerClosedWidth,
            transition: "all 0.3s",
            overflowX: "hidden",
            bgcolor: isDark ? "#0f172a" : "#9f5cfb",
            color: "#fff",
          },
        }}
      >
        {/* TOP */}
        <Box sx={{ p: 2, display: "flex", justifyContent: open ? "space-between" : "center" }}>
          {open && <Typography fontWeight="bold">ACEDAMIX</Typography>}
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* MENU */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.key}
              selected={page === item.key}
              onClick={() => {
                console.log("Clicked:", item.key);
                setPage(item.key);
              }}
              sx={{
                mx: 1,
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "#4f46e5",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>

        {/* SETTINGS */}
        <Box sx={{ mt: "auto", p: 2, display: open ? "block" : "none" }}>
          <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="subtitle2">Settings</Typography>

          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleTheme} />}
            label={mode === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </Box>
      </Drawer>

      {/* MAIN */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* TOP BAR */}
        <Box
          sx={{
            height: 70,
            px: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: isDark ? "#020617" : "#fff",
          }}
        >
          <Typography fontWeight="bold">ACEDAMIX</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            
            {/* 🔔 NOTIFICATION */}
            <IconButton
              onClick={() => {
                setPage("notifications");
                setHasNew(false);
              }}
            >
              <Badge color="error" variant={hasNew ? "dot" : "standard"}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* PROFILE */}
            <Avatar src={userPhoto || ""} onClick={handleProfileOpen} />
          </Box>
        </Box>

        {/* CONTENT */}
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: isDark ? "#000" : "#f9f4ff" }}>
          {children}
        </Box>
      </Box>

      {/* PROFILE MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
        <MenuItem disabled>{userName}</MenuItem>
        <MenuItem disabled>Class: {userClass}</MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            fileInputRef.current.click();
            handleProfileClose();
          }}
        >
          Change Profile Photo
        </MenuItem>
      </Menu>

      {/* FILE INPUT */}
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handlePhotoPick}
      />
    </Box>
  );
}
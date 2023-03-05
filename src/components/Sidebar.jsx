import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Archive, StickyNote2 } from "@mui/icons-material";
import { noteStore } from "../store";

function Sidebar() {
  const activeStyle = {
    color: "#585AFF",
    width: "inherit",
    background: "#dee3ff",
    borderRadius: "5px",
    textDecoration: "none",
    display: "block",
  };

  const inactiveStyle = {
    textDecoration: "none",
    color: "black",
  };
  const total_data = noteStore((state) => state.total_data);
  return (
    <Box flex={1} p={2}>
      <Box position="fixed">
        <List>
          <NavLink
            to="/note-list"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StickyNote2 />
                </ListItemIcon>
                <ListItemText primary={`Diary Note List (${total_data})`} />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink
            to="/archived"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Archive />
                </ListItemIcon>
                <ListItemText primary="Archieved" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;

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

function Sidebar() {
  return (
    <Box flex={1} p={2}>
      <Box position="fixed">
        <List>
          <NavLink>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StickyNote2 />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink>
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

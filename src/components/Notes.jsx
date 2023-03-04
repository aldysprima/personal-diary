import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Notes = ({ title, timestamp, onClick, noteId, onClickArchieve }) => {
  // For Menu to show up when icon button is clicked
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        maxWidth: "200px",
        padding: "20px 20px",
      }}
    >
      <Typography
        fontWeight={500}
        marginBottom="30px"
        onClick={onClick}
        sx={{
          cursor: "pointer",
        }}
      >
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Chip
          label={new Date(timestamp).toLocaleDateString("en", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
          sx={{ borderRadius: "5px", bgcolor: "#36A57D", color: "#ffffff" }}
        />
        <IconButton onClick={handleClick}>
          <MoreHoriz />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={onClickArchieve}>Archieve</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Notes;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = useRef();
  const navigate = useNavigate();

  const onOpen = () => {
    setOpen(true);
    setAnchorEl(divRef.current);
  };

  const onClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const onBtnLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    toast.success("Logout Success!");
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#313638" }}>
      <StyledToolbar>
        <Typography variant="h4" fontWeight="bold">
          JobLizt
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="220px"
        >
          <Typography>Welcome, {user?.username}</Typography>
          <Icons>
            <Avatar sx={{ cursor: "pointer" }} onClick={onOpen} ref={divRef} />
          </Icons>
        </Box>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={onBtnLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;

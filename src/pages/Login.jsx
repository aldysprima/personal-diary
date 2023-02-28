import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import { authStore } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  // import from global state
  const { isLoading, login } = authStore((state) => state);
  // Toggle Visibility
  const [visible, setVisible] = useState(false);
  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Handle login
  const handleLogin = () => {
    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    login(data, navigate, toast);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/note-list");
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display={"flex"}
        width="1000px"
        borderRadius="30px"
        border="1px solid #acabab"
        minHeight="80vh"
        bgcolor="#ffffff"
      >
        <Stack
          flex={1}
          padding="10px 30px"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="40px" fontWeight={700}>
            Hi, Welcome Back!
          </Typography>
          <Typography textAlign="center" fontSize="25px">
            Write your personal diary has never been this easy before
          </Typography>
        </Stack>
        <Stack flex={1} padding="10px 30px" spacing={2} justifyContent="center">
          <Typography fontSize="30px" fontWeight={500}>
            Sign in to MyDiary
          </Typography>
          <TextField label="Username/Email Address" inputRef={email} />
          <TextField
            label="Password"
            type={visible ? "text" : "password"}
            inputRef={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword}>
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              bgcolor: "#212B36",
              "&:hover": {
                backgroundColor: "#200B36",
              },
            }}
            disabled={isLoading ? true : false}
          >
            Login
          </Button>
          <Typography>
            Don't have account yet? <Link to="/register">Sign Up</Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;

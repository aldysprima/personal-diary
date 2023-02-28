import Axios from "axios";
import { useRef, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { authStore } from "../store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  //init navigate
  const navigate = useNavigate();
  // Destruct from global store
  const { isLoading, register } = authStore((state) => state);
  // Hold user input
  const emailRef = useRef();
  const usernameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  // Toggle Visibility
  const [visible, setVisible] = useState(false);
  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  // handle register
  const handleRegister = () => {
    const data = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passRef.current.value,
      password_confirmation: confirmPassRef.current.value,
    };
    register(data, toast, navigate);
  };
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
        <Stack flex={1} justifyContent="center" alignItems={"center"} px={2}>
          <Typography fontSize="40px" fontWeight={700}>
            Glad you join Us!
          </Typography>
          <Typography textAlign="center" fontSize="25px">
            Please take a moment to fill in the form so that we can know you
            better!
          </Typography>
        </Stack>
        <Stack flex={1} padding="10px 20px" justifyContent="center" spacing={2}>
          <TextField
            label="Email"
            size="small"
            type="email"
            inputRef={emailRef}
          />
          <TextField label="Username" size="small" inputRef={usernameRef} />
          <TextField
            label="Password"
            type={visible ? "text" : "password"}
            size="small"
            inputRef={passRef}
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
          <TextField
            label="Confirm Password"
            size="small"
            inputRef={confirmPassRef}
            type={visible ? "text" : "password"}
          />
          <Button
            variant="outlined"
            onClick={handleRegister}
            disabled={isLoading ? true : false}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;

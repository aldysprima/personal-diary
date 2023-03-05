import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validateRegister } from "../utils/validationSchema";
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
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validateRegister,
    onSubmit: (values) => {
      register(values, toast, navigate);
    },
  });
  //init navigate
  const navigate = useNavigate();
  // Destruct from global store
  const { isLoading, register } = authStore((state) => state);
  // Toggle Visibility
  const [visible, setVisible] = useState(false);
  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
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
          <Stack component="form" onSubmit={formik.handleSubmit} spacing={2}>
            <TextField
              label="Email"
              size="small"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Username"
              size="small"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              label="Password"
              type={visible ? "text" : "password"}
              name="password"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
              type={visible ? "text" : "password"}
              name="password_confirmation"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              error={
                formik.touched.password_confirmation &&
                Boolean(formik.errors.password_confirmation)
              }
              helperText={
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
              }
            />
            <Button
              variant="outlined"
              type="submit"
              disabled={isLoading ? true : false}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;

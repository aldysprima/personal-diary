import { Stack, Box, Typography, TextField, Button } from "@mui/material";
const Register = () => {
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
          <TextField label="Email" size="small" type="email" />
          <TextField label="Username" size="small" />
          <TextField label="Password" size="small" />
          <TextField label="Confirm Password" size="small" />
          <Button variant="outlined">Register</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;

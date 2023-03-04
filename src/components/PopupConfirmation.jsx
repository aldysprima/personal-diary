import { Modal, Stack, Box, Typography, Button } from "@mui/material";
import { Warning } from "@mui/icons-material";

const PopupConfirmation = ({ action, open, onClose, onConfirmArchieve }) => {
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={open}
      onClose={onClose}
    >
      <Stack
        bgcolor={"#ffffff"}
        padding="20px"
        alignItems="center"
        width="400px"
        height="300px"
        borderRadius={"10px"}
        spacing={2}
      >
        <Typography fontSize="30px" fontWeight={500}>
          Hold On
        </Typography>
        <Warning sx={{ fontSize: "100px", color: "red" }} />
        <Typography>Are you sore you want to {action} ?</Typography>
        <Box display="flex" gap={2} width="inherit">
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onConfirmArchieve}
          >
            Yes
          </Button>
          <Button variant="outlined" color="error" fullWidth onClick={onClose}>
            No
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};

export default PopupConfirmation;

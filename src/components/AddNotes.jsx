import { useState } from "react";
import {
  Add,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { noteStore } from "../store";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

function AddPost() {
  const { postNotes, isLoading, fetchNotes } = noteStore((state) => state);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onBtnSubmit = () => {
    postNotes(data, setOpen, fetchNotes);
  };
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Diary Notes"
        sx={{ position: "fixed", bottom: 20, right: 100 }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width="400px" bgcolor="white" borderRadius={5} p={3}>
          <Typography variant="h6" color="gray" textAlign="center">
            Create New Diary Notes
          </Typography>
          <UserBox>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Typography fontWeight={500} variant="span">
              {userData.username}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            placeholder="Title"
            variant="standard"
            name="title"
            onChange={handleChange}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={5}
            placeholder="Content"
            variant="standard"
            name="content"
            onChange={handleChange}
            helperText="Maximum 500 Characters"
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={onBtnSubmit}
            disabled={isLoading ? true : false}
          >
            {isLoading ? <CircularProgress /> : "Submit"}
          </Button>
        </Box>
      </StyledModal>
    </>
  );
}

export default AddPost;

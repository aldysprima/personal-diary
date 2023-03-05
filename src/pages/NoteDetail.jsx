import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { noteStore } from "../store";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Cancel, Edit, Save } from "@mui/icons-material";

const NoteDetail = () => {
  const params = useParams();
  const { fetchNotesById, updateNotes, isLoading } = noteStore(
    (state) => state
  );
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});

  //Capture new Value
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  //SUbmit Data
  const onConfirmEdit = () => {
    const dataToSubmit = {
      title: data.title,
      content: data.content,
    };
    updateNotes(params.id, dataToSubmit, setEdit, fetchNotesById, setData);
  };

  // fn to trigger edit

  useEffect(() => {
    fetchNotesById(params.id, setData);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Stack
          bgcolor="#ffffff"
          padding="10px 20px"
          borderRadius="10px"
          spacing={4}
          width="500px"
        >
          <Stack>
            <Box display="flex" justifyContent="space-between">
              {edit ? (
                <TextField
                  size="small"
                  sx={{ marginBottom: "10px" }}
                  value={data.title}
                  onChange={handleChange}
                  name="title"
                />
              ) : (
                <Typography fontWeight={500} fontSize="30px">
                  {data.title}
                </Typography>
              )}
              <Box>
                <Tooltip title={edit ? "Save" : "Edit"}>
                  <IconButton
                    onClick={edit ? onConfirmEdit : () => setEdit(true)}
                  >
                    {edit ? <Save /> : <Edit />}
                  </IconButton>
                </Tooltip>
                {edit && (
                  <Tooltip title="Cancel">
                    <IconButton onClick={() => setEdit(false)}>
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
            <Box>
              <Chip
                label={`Created:  ${new Date(
                  data.created_at
                ).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}`}
                size="small"
                sx={{
                  borderRadius: "5px",
                  bgcolor: "#36A57D",
                  color: "#ffffff",
                }}
              />
            </Box>
          </Stack>
          {edit ? (
            <TextField
              size="small"
              sx={{ marginBottom: "10px" }}
              value={data.content}
              onChange={handleChange}
              name="content"
              multiline
              rows={5}
              inputProps={{ maxLength: 500 }}
              helperText="Maximum Characters 500"
            />
          ) : (
            <Typography>{data.content}</Typography>
          )}
          {data.created_at === data.updated_at ? null : (
            <Box display="flex" justifyContent="flex-end">
              <Chip
                label={`Updated:  ${new Date(
                  data.updated_at
                ).toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}`}
                size="small"
                sx={{
                  borderRadius: "5px",
                  bgcolor: "#537FE7",
                  color: "#ffffff",
                }}
              />
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default NoteDetail;

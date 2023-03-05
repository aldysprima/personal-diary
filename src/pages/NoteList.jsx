import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputBase,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import { noteStore } from "../store";
import { useNavigate } from "react-router-dom";
import AddPost from "../components/AddNotes";
import PopupConfirmation from "../components/PopupConfirmation";
const NoteList = () => {
  const navigate = useNavigate();
  const { notes, fetchNotes, isLoading, archieveNotes, total_data } = noteStore(
    (state) => state
  );
  const [open, setOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [keyword, setKeyword] = useState("");

  // Handle Search
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  //Handle Archieve feature
  const onClickArchieve = (id) => {
    setSelectedNoteId(id);
    setOpen(true);
  };
  const onConfirmArchieve = () => {
    archieveNotes(selectedNoteId, setOpen, fetchNotes);
  };

  //Navigate to diary note detail when clicked
  const onClickDetail = (id) => {
    navigate(`/note-detail/${id}`);
  };

  useEffect(() => {
    fetchNotes(keyword);
  }, [keyword]);

  return (
    <>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex={5} padding={4}>
          <Box display="flex" justifyContent="space-between">
            <Box
              bgcolor="white"
              padding="0 10px"
              borderRadius="10px"
              border="1px solid #ACABAB"
              sx={{
                width: "470px",
                maxWidth: "100%",
                marginBottom: "20px",
              }}
            >
              <InputBase
                placeholder="Search By Diary Notes Title"
                fullWidth
                onChange={handleSearch}
              />
            </Box>
            <Pagination
              count={Math.ceil(total_data / 10)}
              color="primary"
              onChange={(event, value) => {
                fetchNotes(keyword, value);
              }}
            />
          </Box>

          {notes.length === 0 && !isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <Typography>No Data(s)</Typography>
            </Box>
          ) : null}

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
            <Grid container spacing={2}>
              {notes
                ? notes.map((note, index) => {
                    return (
                      <Notes
                        key={index}
                        title={note.title}
                        timestamp={note.created_at}
                        onClick={() => onClickDetail(note.id)}
                        noteId={note.id}
                        onClickArchieve={() => onClickArchieve(note.id)}
                      />
                    );
                  })
                : null}
            </Grid>
          )}

          <AddPost />
          <PopupConfirmation
            open={open}
            action="archieve this note"
            onClose={() => setOpen(false)}
            onConfirmArchieve={onConfirmArchieve}
          />
        </Box>
      </Box>
    </>
  );
};

export default NoteList;

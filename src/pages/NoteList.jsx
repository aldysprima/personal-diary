import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import { noteStore } from "../store";
import { useNavigate } from "react-router-dom";
import AddPost from "../components/AddNotes";
import PopupConfirmation from "../components/PopupConfirmation";
const NoteList = () => {
  const navigate = useNavigate();
  const { notes, fetchNotes, isLoading, archieveNotes } = noteStore(
    (state) => state
  );
  const [open, setOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState("");

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
    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex={5} padding={4}>
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

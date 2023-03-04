import { useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import { noteStore } from "../store";
import { useNavigate } from "react-router-dom";
const NoteList = () => {
  const navigate = useNavigate();
  const { notes, fetchNotes, isLoading } = noteStore((state) => state);

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log("Notes :", notes);
  const onClickDetail = (id) => {
    navigate(`/note-detail/${id}`);
  };
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
                  />
                );
              })
            : null}
        </Box>
      </Box>
    </>
  );
};

export default NoteList;

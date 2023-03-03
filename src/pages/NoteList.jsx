import { useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import { noteStore } from "../store";
const NoteList = () => {
  const { notes, fetchNotes, isLoading } = noteStore((state) => state);
  useEffect(() => {
    fetchNotes();
  }, []);

  console.log("Notes :", notes);
  return (
    <>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex={5} padding={4}>
          <Notes />
        </Box>
      </Box>
    </>
  );
};

export default NoteList;

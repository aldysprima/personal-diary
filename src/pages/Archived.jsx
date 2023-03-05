import { Box, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Archived = () => {
  return (
    <>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flex={5} padding={4}>
          <Typography>Archived</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Archived;

import { MoreHoriz } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";

const Notes = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        maxWidth: "200px",
        padding: "20px 20px",
      }}
    >
      <Typography fontWeight={500} marginBottom="30px">
        One thing to remember
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Chip
          label="March 3rd, 2023"
          sx={{ borderRadius: "5px", bgcolor: "#36A57D", color: "#ffffff" }}
        />
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Notes;

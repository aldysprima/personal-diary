import { MoreHoriz } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";

const Notes = ({ title, timestamp, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        maxWidth: "200px",
        padding: "20px 20px",
        cursor: "pointer",
      }}
    >
      <Typography fontWeight={500} marginBottom="30px">
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Chip
          label={new Date(timestamp).toLocaleDateString("en", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
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

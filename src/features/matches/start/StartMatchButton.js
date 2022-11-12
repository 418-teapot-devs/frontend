import { React } from "react";
import {
  Grid,
  Button,
} from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

export const StartButton = ({handleStart}) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Button
        variant="contained"
        startIcon={<PlayArrowOutlinedIcon />}
        onClick={handleStart}
      >
        Iniciar
      </Button>
    </Grid>
  );
};

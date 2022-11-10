import { React } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const matchWinners = ({ results, robots }) => {
    let winners = [];
    Object.keys(results).forEach((key) => {
      if (results[key].robot_pos === 1) {
        winners.push(robots[key].name);
      }
    });
    return winners;
  };


export const MatchResults = (results) => {
    return (
      <Box textAlign="center">
        <Typography variant="h5">
          <EmojiEventsIcon sx={{ fontSize: 25, color: "#ffc107" }} />
          {"Ganador: " + matchWinners(results)}
        </Typography>
      </Box>
    );
  };
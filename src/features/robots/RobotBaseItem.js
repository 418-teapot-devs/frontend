import React from "react"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/system"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export function RobotBaseItem(props) {

  return (
    <Box display="inline-block" sx={{width: "100%"}}>
      <Card variant="outlined">
        <CardContent>
          <Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack sx={{ mb: 1}}>
                <Stack direction="column" alignItems="left">
                  <Typography variant="overline" margin={0} noWrap={true}>
                    {props.name}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap={true}>
                    <EmojiEventsIcon sx={{fontSize: 15, color: "#ffc107"}}> 
                    </EmojiEventsIcon> Tasa de victorias: {props.played_matches ? props.won_matches / props.played_matches : 0}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap={true}>
                    <LocalFireDepartmentIcon sx={{fontSize: 15, color: "#f44336"}}>
                    </LocalFireDepartmentIcon> Partidas jugadas: {props.played_matches}
                  </Typography>
                </Stack>
              </Stack>
              <Avatar src={"http://localhost:8000" + props.avatar_url} sx={{ width: 60, height: 60 }}/>
            </Stack>
          </Stack>
        </CardContent>
        {props.children}
      </Card>
    </Box>
    
  )
}
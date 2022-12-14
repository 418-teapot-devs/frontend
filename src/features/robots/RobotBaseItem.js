import React from "react"
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Stack } from "@mui/system"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export function RobotBaseItem(props) {
  return (
    <Box display="inline-block" sx={{ width: "100%" }}>
      <Card
        variant="outlined"
        sx={(theme) => ({backgroundColor: theme.palette.background.default})}
      >
        <CardContent>
          <Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack sx={{ mb: 1 }}>
                <Stack direction="column" alignItems="left">
                  <Typography variant="overline" margin={0} noWrap={true}>
                    {props.name}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap={true}>
                    <EmojiEventsIcon sx={{fontSize: 15, color: "#ffc107"}}> 
                    </EmojiEventsIcon> Tasa de victorias: {props.played_matches ? ((props.won_matches / props.played_matches) * 100).toFixed(0) + "%" : 0 + "%"}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap={true}>
                    <TrendingUpIcon sx={{fontSize: 15, color: "#0c83fa"}}> 
                    </TrendingUpIcon> MMR: {props.mmr}
                  </Typography>
                  <Typography variant="caption" margin={0} noWrap={true}>
                    <LocalFireDepartmentIcon sx={{fontSize: 15, color: "#f44336"}}>
                    </LocalFireDepartmentIcon> Partidas jugadas: {props.played_matches}
                  </Typography>
                </Stack>
              </Stack>
              <Avatar
                src={"http://localhost:8000" + props.avatar_url}
                sx={{ width: 60, height: 60, bgcolor: grey[400] }}
              />
            </Stack>
          </Stack>
        </CardContent>
        {props.children}
      </Card>
    </Box>
  )
}

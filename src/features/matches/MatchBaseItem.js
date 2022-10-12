import React from "react"
import { Avatar, AvatarGroup, Card, CardContent, Typography } from "@mui/material"
import { Box, Stack } from "@mui/system"
import { LockOutlined, PersonOutlined } from "@mui/icons-material"
import { grey } from '@mui/material/colors';


export function MatchBaseItem(props) {

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined" >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {props.is_private && <LockOutlined color="disabled"/>}
                <Typography variant="h5" margin={0}>
                  {props.name}
                </Typography>
              </Stack>
              <Typography color="text.secondary">
                @{props.username}
              </Typography>
            </Stack>
            <AvatarGroup max={4}>
              {props.robots.map((robot) => (
                <Avatar key={robot.username} src={robot.avatar_url} />
              ))}
              {Array.from({length: (props.max_players - props.robots.length)}, (_, i) => (
                <Avatar key={i} sx={{ bgcolor: "white", outline: "2px dashed", outlineColor: grey[400], outlineOffset: "-4px" }}>
                  <PersonOutlined sx={{ color: grey[400] }}/>
                </Avatar>
              ))}
            </AvatarGroup>
          </Stack>
          <Box>
            <Typography variant="body2">
              {props.games} Juegos
            </Typography>
            <Typography variant="body2">
              {props.rounds} Rondas
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

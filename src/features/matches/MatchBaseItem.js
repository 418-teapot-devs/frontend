import React from "react"
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material"
import { Box, Stack } from "@mui/system"
import { LockOutlined, PersonOutlined } from "@mui/icons-material"
import { grey } from "@mui/material/colors"

export function MatchBaseItem(props) {
  const missing_robots = props.max_players - props.robots.length

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                {props.is_private && <LockOutlined color="disabled" />}
                <Typography variant="h6" margin={0}>
                  {props.name}
                </Typography>
              </Stack>
              {Boolean(props.username) && (
                <Typography color="text.secondary">
                  @{props.username}
                </Typography>
              )}
            </Stack>
            <AvatarGroup max={4}>
              {props.robots.map((robot, index) => (
                <Tooltip
                  title={`${robot.name}, @${robot.username}`}
                  placement="top-start"
                  arrow
                  key={index}
                >
                  <Avatar key={index} src={robot.avatar_url} />
                </Tooltip>
              ))}
              {Array.from({ length: missing_robots }, (_, i) => (
                <Avatar
                  key={i}
                  sx={{
                    bgcolor: "white",
                    outline: "1.5px solid",
                    outlineColor: grey[400],
                    outlineOffset: "-4px",
                  }}
                >
                  <PersonOutlined sx={{ color: grey[400] }} />
                </Avatar>
              ))}
            </AvatarGroup>
          </Stack>
          <Box>
            <Typography variant="body2">{props.games} Juegos</Typography>
            <Typography variant="body2">{props.rounds} Rondas</Typography>
          </Box>
        </Stack>
      </CardContent>
      {props.children}
    </Card>
  )
}

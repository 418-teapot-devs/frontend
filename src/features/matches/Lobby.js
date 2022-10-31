import { React, useEffect, useState, Redirect } from "react"
import { useAuth } from "../../hooks/useAuth"
import AddIcon from "@mui/icons-material/Add"
import { createTheme } from "@mui/material/styles"
import { mockmatch } from "./api/mockmatch"
import { grey } from "@mui/material/colors"
import { PersonOutlined, LockOutlined } from "@mui/icons-material"
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material"
import { ThemeProvider } from "@emotion/react"

var matchCardStyle = {
  display: "block",
  transitionDuration: "0.3s",
  height: "30vw",
  width: "50vw",
  overflow: "scroll",
}

var theme = createTheme({
  typography: {
    htmlFontSize: 11,
  },
})

export const Lobby = () => {
  const missing_robots = mockmatch.max_players - mockmatch.robots.length

  //   const [loading, setLoading] = useState(false)
  //   const [match, setMatch] = useState([])
  //   const { user } = useAuth()

  //   useEffect(() => {
  //     const fetchMatch = async () => {
  //       const response = await getMatch(user.token, props.match.params.id)

  //       switch (response.status) {
  //         case 200:
  //           const body = await response.json()
  //           setMatch(body)
  //           setLoading(false)
  //           break
  //         default:
  //           setLoading(false)
  //           break
  //       }
  //     }

  //     fetchMatch()
  //   }, [user.token])

  return (
    <Card style={matchCardStyle}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          textAlign="center"
        >
          {mockmatch.name}{" "}
          {mockmatch.is_private && (
            <Tooltip title="This match is private" placement="top-start" arrow>
              <LockOutlined color="enabled" />
            </Tooltip>
          )}
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid container item xs={2} direction="column">
            <Box display="inline-block">
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack direction="column" alignItems="left" noWrap>
                    <ThemeProvider theme={theme}>
                      <Typography variant="overline" margin={0} noWrap>
                        Host: {mockmatch.username}
                      </Typography>
                      <Divider />
                      <Typography variant="overline" margin={0} noWrap>
                        Min. players: {mockmatch.min_players}
                      </Typography>
                      <Divider />
                      <Typography variant="overline" margin={0} noWrap>
                        Max. players: {mockmatch.max_players}
                      </Typography>
                      <Divider />
                      <Typography variant="overline" margin={0} noWrap>
                        #Games: {mockmatch.games}
                      </Typography>
                      <Divider />
                      <Typography variant="overline" margin={0} noWrap>
                        #Rounds: {mockmatch.rounds}
                      </Typography>
                    </ThemeProvider>
                  </Stack>
                </Stack>
              </CardContent>
            </Box>
            <Grid />
            <Grid container item xs={10} direction="column">
              <AvatarGroup max={4}>
                {mockmatch.robots.map((robot, index) => (
                  <Tooltip
                    title={`${robot.name}, @${robot.username}`}
                    placement="top-start"
                    arrow
                    key={index}
                  >
                    <Avatar
                      key={index}
                      src={robot.avatar_url}
                      sx={{ minWidth: "70px", minHeight: "70px" }}
                    />
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
                      minWidth: "70px",
                      minHeight: "70px",
                    }}
                  >
                    <PersonOutlined sx={{ color: grey[400] }} />
                  </Avatar>
                ))}
              </AvatarGroup>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

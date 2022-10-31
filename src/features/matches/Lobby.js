import { React, useEffect, useState, Redirect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { grey } from "@mui/material/colors"
import { PersonOutlined, LockOutlined } from "@mui/icons-material"
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardActions,
  Collapse,
  Slide,
} from "@mui/material"
import { TransitionGroup } from "react-transition-group"

export const Lobby = ({ match }) => {
  const { user } = useAuth()
  const missing_robots = match.max_players - match.robots.length

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              textAlign="center"
            >
              {match.name}
              {""}
              {match.is_private && (
                <Tooltip
                  title="This match is private"
                  placement="top-start"
                  arrow
                >
                  <LockOutlined color="enabled" />
                </Tooltip>
              )}
            </Typography>

            <Stack spacing={2}>
              <Stack>
                <Typography variant="overline" margin={0} noWrap>
                  Host: {match.host.username}
                </Typography>
                <Divider />
                <Typography variant="overline" margin={0} noWrap>
                  Min. players: {match.min_players}
                </Typography>
                <Divider />
                <Typography variant="overline" margin={0} noWrap>
                  Max. players: {match.max_players}
                </Typography>
                <Divider />
                <Typography variant="overline" margin={0} noWrap>
                  #Games: {match.games}
                </Typography>
                <Divider />
                <Typography variant="overline" margin={0} noWrap>
                  #Rounds: {match.rounds}
                </Typography>
              </Stack>
              <Stack>
                <Typography>Robots:</Typography>
                <List>
                  <TransitionGroup>
                    {match.robots.map((robot) => (
                      <Slide
                        key={robot.username + robot.name}
                        direction="right"
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={robot.avatar_url} />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography
                              variant="body1"
                            >
                              {robot.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              @{robot.username}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      </Slide>
                    ))}
                  </TransitionGroup>
                  {Array.from({ length: missing_robots }, (_, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "white",
                            outline: "1.5px solid",
                            outlineColor: grey[400],
                          }}
                        >
                          <PersonOutlined sx={{ color: grey[400] }} />
                        </Avatar>
                      </ListItemAvatar>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>{match.host.username === user.username}</CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

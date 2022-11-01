import { React, useEffect, useState, Redirect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { grey } from "@mui/material/colors"
import { PersonOutlined } from "@mui/icons-material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Stack,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardActions,
  Slide,
  CircularProgress,
  Button,
} from "@mui/material"
import { TransitionGroup } from "react-transition-group"

export const Lobby = ({ match }) => {
  const { user } = useAuth()
  const missing_robots = match.max_players - match.robots.length
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            </Typography>

            <Box textAlign="center">
              {match.status === "in_progress" && (
                <Box>
                  <CircularProgress size={20} />
                  <Typography>Partida en progreso</Typography>
                </Box>
              )}
              {match.status === "waiting" && (
                <Typography>
                  Esperando que se unan {missing_robots} robots...
                </Typography>
              )}
              {match.status === "finished" && (
                <Typography>Partida finalizada</Typography>
              )}
            </Box>

            <Stack spacing={2}>
              <Card spacing={2}>
                <CardContent>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1}>
                      <Avatar src={match.host.avatar_url} />
                      <Typography variant="overline" margin={1} noWrap>
                        Creador: @{match.host.username}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Typography variant="overline" margin={0} noWrap>
                      Min. jugadores: {match.min_players}
                    </Typography>
                    <Divider />
                    <Typography variant="overline" margin={0} noWrap>
                      Max. jugadores: {match.max_players}
                    </Typography>
                    <Divider />
                    <Typography variant="overline" margin={0} noWrap>
                      Juegos: {match.games}
                    </Typography>
                    <Divider />
                    <Typography variant="overline" margin={0} noWrap>
                      Rondas: {match.rounds}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Box textAlign="center">
                {match.status === "finished" && match.result && (
                  <Typography variant="h5">
                    <EmojiEventsIcon sx={{ fontSize: 25, color: "#ffc107" }} />{" "}
                    Ganador: {match.result}
                  </Typography>
                )}
              </Box>
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
                            <Typography variant="body1">
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
          <CardActions>
            {match.host.username === user.username}
            <Grid container justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ExitToAppIcon />}
                onClick={handleClickOpen}
              >
                Abandonar
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="alert-dialog-title">
                  {"¿Quieres abandonar la partida?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={handleClose} component={Link} to="/matches/">
                    Sí, abandonar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

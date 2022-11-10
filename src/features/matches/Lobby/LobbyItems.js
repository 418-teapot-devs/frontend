import { React } from "react";
import { grey } from "@mui/material/colors";
import { PersonOutlined } from "@mui/icons-material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  CircularProgress,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const JoinedRobotItem = ({ robot }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={"http://localhost:8000" + robot.avatar_url} />
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="body1">{robot.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          @{robot.username}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

const MissingRobotItem = () => {
  return (
    <ListItem>
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
  );
};

export const Players = ({ robots, missing_robots }) => {
  return (
    <List>
      <TransitionGroup>
        {Object.values(robots).map((robot) => (
          <Slide key={robot.robot_id} direction="right">
            <Box>
              <JoinedRobotItem robot={robot} />
            </Box>
          </Slide>
        ))}
      </TransitionGroup>
      {Array.from({ length: missing_robots }, (_, i) => (
        <MissingRobotItem key={i} />
      ))}
    </List>
  );
};

const Host = ({ host }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar src={"http://localhost:8000" + host.avatar_url} />
      <Typography variant="overline">Creador: @{host.username}</Typography>
    </Stack>
  );
};

export const MatchDescription = ({ match }) => {
  const description = [
    `min.jugadores: ${match.min_players}`,
    `max.jugadores: ${match.max_players}`,
    `juegos: ${match.games}`,
    `rondas: ${match.rounds}`,
  ];

  return (
    <Card>
      <CardContent>
        <Stack spacing={0.5}>
          <Host host={match.host} />
          <Divider />
          {description.map((field) => {
            return (
              <div>
                <Typography variant="overline">{field}</Typography>
                <Divider />
              </div>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export const Title = ({ match }) => {
  return (
    <Typography gutterBottom variant="h4" component="div" textAlign="center">
      {match.name + " "}
      {match.is_private && (
        <LockOutlined data-testid="public-match-private" color="disabled" />
      )}
    </Typography>
  );
};

export const InfoMessage = ({ state, missing_robots }) => {
  switch (state) {
    case "Lobby":
      return (
        <Typography>
          Esperando que se unan {missing_robots} robots...
        </Typography>
      );
    case "Finished":
      return <Typography>Partida finalizada</Typography>;
    default:
      return;
  }
};

export const LoadingBox = ({ loading }) => {
  return (
    <Box>
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "3s" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress size={20} />
      </Fade>
      <Typography>Partida en progreso</Typography>
    </Box>
  );
};

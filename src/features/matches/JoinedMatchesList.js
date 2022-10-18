import React, { useState } from "react"
import { MatchBaseItem } from "./MatchBaseItem"
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { styled } from "@mui/material/styles"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return (
    <Button {...other} data-testid="details-button" aria-label="show-more" />
  )
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const JoinedMatch = ({ match }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <MatchBaseItem {...match}>
      <CardActions sx={{ justifyContent: "flex-end" }} data-testid="match-card">
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent data-testid="match-card-content">
          {match.min_players - match.robots.length !== 0 && (
            <Typography>
              @{match.username} podrá iniciar la partida cuando lleguen{" "}
              {match.min_players - match.robots.length} robots más...
            </Typography>
          )}
          {match.min_players - match.robots.length === 0 && (
            <Typography>
              Esperando a que @{match.username} inicie la partida...
            </Typography>
          )}
          <List dense={true}>
            <ListSubheader>Robots Unidos</ListSubheader>
            {match.robots.map((robot, index) => (
              <ListItem key={index} data-testid="match-player">
                <ListItemAvatar>
                  <Avatar src={robot.avatar_url} />
                </ListItemAvatar>

                <ListItemText
                  data-testid="robot-data"
                  primary={robot.name}
                  secondary={"@" + robot.username}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </MatchBaseItem>
  )
}

const GridJoinedMatches = ({ matches }) => {
  return (
    <Grid container spacing={3} data-testid="match-grid">
      {matches.map((match, index) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
          <JoinedMatch match={match} />
        </Grid>
      ))}
    </Grid>
  )
}

var matchCardStyle = {
  height: "100%",
  overflow: "scroll",
}

export const JoinedMatchesList = ({ matches }) => {
  return (
    <Card variant="outlined" style={matchCardStyle}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          Mis Partidas
        </Typography>
        <GridJoinedMatches matches={matches} />
      </CardContent>
    </Card>
  )
}

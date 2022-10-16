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
  Avatar
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const JoinedMatch = ({match}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return(
  <MatchBaseItem {...match}>
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit {...match}>
        <CardContent>
          {(match.min_players - match.robots.length)!== 0 && 
            <Typography>
              @{match.username} podrá iniciar la partida cuando lleguen {match.min_players - match.robots.length} robots más...
            </Typography>
          }
          {((match.min_players - match.robots.length) === 0) &&
            <Typography>
              Esperando a que @{match.username} inicie la partida...
            </Typography>
          }
          <List dense="true">

            <ListSubheader>
              Robots Unidos
            </ListSubheader>
            {match.robots.map((robot) => 
                <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={robot.avatar_url}
                  />
                </ListItemAvatar>

                  <ListItemText
                    primary={robot.name}
                    secondary={"@" + robot.username}
                  />
                </ListItem>,
          
            )}
          </List>    
          </CardContent>
      </Collapse>
  </MatchBaseItem>
)}

const GridJoinedMatches = ({ matches }) => {
  return (
    <Grid container spacing={3}>
      {matches.map((match, index) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
          <JoinedMatch match={match}/>
        </Grid>
      ))}
    </Grid>
  )
}

var matchCardStyle = {
  height: "100%",
  overflow: "scroll",
}

export const JoinedMatches = ({ matches }) => {
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

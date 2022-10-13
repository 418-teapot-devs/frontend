import React from "react"
import { MatchBaseItem } from "./MatchBaseItem"
import { listCreated } from "./api/created"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from "@mui/material"

const callback = (name) => {
  window.alert("Se iniciará la partida: " + name)
}

const GridCreatedMatches = () => {
  return (
    <Grid container spacing={1}>
      {listCreated().map((match) => (
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <MatchBaseItem {...match}>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => callback(match.name)}
                disabled={match.robots.length < match.min_players}
              >
                Iniciar
              </Button>
            </CardActions>
          </MatchBaseItem>
        </Grid>
      ))}
    </Grid>
  )
}

var matchCardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '20vw',
  overflow: 'scroll'
}

export const CreatedMatches = () => {
  return(
    <Card variant="outlined" style={matchCardStyle}>
      <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Partidas creadas
          </Typography>
      <GridCreatedMatches  />
      </CardContent>
    </Card>
  )
}

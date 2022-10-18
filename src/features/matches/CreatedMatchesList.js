import React from "react"
import { MatchBaseItem } from "./MatchBaseItem"
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

const GridCreatedMatches = ({ matches }) => {
  return (
    <Grid container spacing={3}>
      {matches.map((match, index) => (
        <Grid item xs={6} key={index}>
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
  height: "100%",
  overflow: "scroll",
}

export const CreatedMatchesList = ({ matches }) => {
  return (
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
        <GridCreatedMatches matches={matches} />
      </CardContent>
    </Card>
  )
}

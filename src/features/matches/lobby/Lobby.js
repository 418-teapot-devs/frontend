import { React, useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { useNavigate, useParams } from "react-router-dom"
import { abandonMatch } from "../abandon/abandonMatch"
import { startMatch } from "../start/startMatch"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  CardActions,
} from "@mui/material"
import {
  Players,
  Title,
  InfoMessage,
  MatchDescription,
  LoadingBox,
} from "./LobbyItems"
import { MatchResults } from "./MatchResults"
import { StartButton } from "../start/StartMatchButton"
import { AbandonButton } from "../abandon/AbandonMatchButton"

export const Lobby = ({ match }) => {
  const { user } = useAuth()
  const { matchId } = useParams()
  const missing_robots = match.max_players - Object.keys(match.robots).length
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const navigate = useNavigate()

  const handleStart = () => {
    const response = startMatch(user.token, matchId)
    switch (response.status) {
      case 201:
        setError(false)
        setLoading(true)
        setStarted(true)
        break
      default:
        setLoading(false)
        setError(true)
        setStarted(false)
        break
    }
  }

  const handleAbandon = async () => {
    const response = await abandonMatch(user.token, matchId)
    switch (response.status) {
      case 201:
        setError(false)
        navigate("/matches", { replace: true })
        break
      case 404:
        setNotFound(true)
        setError(true)
        break
      default:
        setError(true)
        break
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card variant="outlined">
          <CardContent>
            <Title match={match} />
            <Box textAlign="center">
              {started && <LoadingBox loading={loading} />}
              <InfoMessage
                state={match.state}
                missing_robots={missing_robots}
              />
            </Box>
            <Stack spacing={2}>
              <MatchDescription match={match} />

              {match.state === "Finished" && match.results && (
                <MatchResults results={match.results} robots={match.robots} />
              )}
              <Typography>Robots:</Typography>
              <Players robots={match.robots} missing_robots={missing_robots} />
            </Stack>
          </CardContent>
          <CardActions>
            {user.profile.username === match.host.username &&
              match.state === "Lobby" &&
              Object.keys(match.robots).length >= match.min_players && (
                <StartButton onClick={handleStart} />
              )}
            {user.profile.username !== match.host.username && 
              match.state !== "Finished" && (
              <AbandonButton
                handleAbandon={handleAbandon}
                error={error}
                notFound={notFound}
              />
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

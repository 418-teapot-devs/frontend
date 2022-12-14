import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { MatchListItem } from "./MatchListItem"
import { MatchesList } from "./MatchesList"
import {
  TableRow,
  Box,
  Button,
  Typography,
  Stack,
  LinearProgress,
} from "@mui/material"
import TableCell from "@mui/material/TableCell"
import RefreshIcon from "@mui/icons-material/Refresh"

const getList = async (matchType, token) => {
  const endpoint = `http://127.0.0.1:8000/matches/?match_type=${matchType}`
  return fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      token: token,
    },
  })
}

export const Matches = (props) => {
  const [matches, setMatches] = useState([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const fetchMatches = useCallback(async () => {
    setLoading(true)
    const response = await getList(props.matchType, user.token)
    switch (response.status) {
      case 200:
        const body = await response.json()
        setMatches(body)
        setLoading(false)
        break
      default:
        setLoading(false)
        break
    }
  }, [props.matchType, user.token])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])
 
  return (
    <Box>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress /> 
        </Box>
      )}
      <Box alignItems="center" sx={{ margin: 2 }}>
        <Stack direction="row">
          <Typography variant="h5"> {props.title} </Typography>
          <Button
            onClick={() => {
              fetchMatches()
              setLoading(true)
            }}
            data-testid="refresh-button"
          >
            <RefreshIcon />
          </Button>
        </Stack>

        <MatchesList data-testid="matches-list" height={props.height}>
          {matches.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                Parece que todavía no hay ninguna partida...
              </TableCell>
            </TableRow>
          )}

          {matches.map((match) => {
            return (
              <MatchListItem
                match={match}
                onClick={props.onClick}
                buttontext={props.buttontext}
                key={match.id}
              />
            )
          })}
        </MatchesList>
      </Box>
    </Box>
  )
}

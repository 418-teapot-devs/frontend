import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { MatchListItem } from "./MatchListItem"
import { MatchesList } from "./MatchesList"
import { TableRow, Box } from "@mui/material"
import TableCell from "@mui/material/TableCell"

export const Matches = (props) => {

  const [matches, setMatches] = useState([])
  const { user } = useAuth()

  const endpoint = `http://127.0.0.1:8000/matches/?match_type=${props.matchType}`

  useEffect(() => {
    const loadList = async () => {
      fetch(endpoint, {
        method: "GET",
        headers: {
          accept: "application/json",
          token: user.token,
        },
      })
      .then((response) => response.json())
      .then((data) => setMatches(data))
    }
    loadList()
  }, [user.token]);

  return(
    <Box alignItems="center">
    <MatchesList data-testid="matches-list">
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
  )
}

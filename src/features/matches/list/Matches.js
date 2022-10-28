import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { MatchListItem } from "./MatchListItem"
import { MatchesList } from "./MatchesList"
import { TableRow, Box } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { mockpublic } from "./mockpublic"

const Matches = (props) => {

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
      {mockpublic.length === 0 && (
      <TableRow>
        <TableCell colSpan={8} align="center">
          Parece que todavía no hay ninguna partida...
        </TableCell>
      </TableRow>
      )}

      {mockpublic.map((match) => {
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

export const PublicMatches = () => {
  return (
    <Matches
      matchType="public"
      onClick={()=> {}}
      buttontext="Unirme"
      data-testid="public-matches"
    />
  )
};

export const CreatedMatches = () => {
  return (
    <Matches
      matchType="created"
      onClick={() =>{}}
      buttontext="Iniciar"
      data-testid="created-matches"
    />
  )

}

export const JoinedMatches = () => {
  return (
    <Matches
      matchType="joined"
      onClick={() => {}}
      buttontext="Detalles"
      data-testid="joined-matches"
    />
  )
}

export const StartedMatches = () => {
  return (
    <Matches
      matchType="started"
      onClick={() =>{}}
      buttontext="Detalles"
      data-testid="started-matches"
    />
  )
}
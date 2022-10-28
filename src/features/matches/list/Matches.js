import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { MatchListItem } from "./MatchListItem"
import { MatchesList } from "./MatchesList"
import { TableRow, Box } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { mockpublic } from "./mockpublic"

const Matches = (filter, onClick, buttontext) => {

  const [matches, setMatches] = useState([])
  const { user } = useAuth()

  const endpoint = `http://127.0.0.1:8000/matches/?filter=${filter}`

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
    <MatchesList >
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
            onClick={onClick}
            buttontext={buttontext}
            key={match.id}
          />
        )
      })}
    </MatchesList>
    </Box>
  )
}

export const PublicMatches = () => {
  return (<Matches filter="public" onClick={()=> {console.log("Public")}} buttontext="Unirme"/>)
};

export const CreatedMatches = () => {
  return (<Matches filter="created" onClick={() =>{console.log("Created")}} buttontext="Iniciar"/>)
}

export const JoinedMatches = () => {
  return (<Matches filter="joined" onClick={() => {console.log("Joined")}} buttontext="Detalles"/>)
}

export const StartedMatches = () => {
  return (<Matches filter="started" onClick={() =>{console.log("Started")}} buttontext="Detalles"/>)
}
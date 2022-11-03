import { Matches } from "./Matches"
import { useNavigate } from "react-router-dom"

export const JoinedMatches = (height) => {
  const navigate = useNavigate()
  return (
    <Matches
      matchType="joined"
      onClick={(match) => navigate(`/matches/${match.id}`)}
      buttontext="Detalles"
      height={height}
      title="Partidas unidas"
    />
  )
}

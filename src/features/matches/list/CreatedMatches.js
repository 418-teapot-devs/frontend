import { Matches } from "./Matches"
import { useNavigate } from "react-router-dom"

export const CreatedMatches = (height) => {
  const navigate = useNavigate()
  return (
    <Matches
      matchType="created"
      onClick={(match) => navigate(`/matches/${match.id}`)}
      buttontext="Detalles"
      height={height}
      title="Mis partidas"
    />
  )
}
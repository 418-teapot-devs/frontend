import { Matches } from "./Matches"
import { useNavigate } from "react-router-dom"

export const StartedMatches = ({height}) => {
  const navigate = useNavigate();
  return (
    <Matches
      matchType="started"
      onClick={(match) => navigate(`/matches/${match.id}`)}
      buttontext="Detalles"
      height={height}
      title="Historial de partidas"
    />
  )
}
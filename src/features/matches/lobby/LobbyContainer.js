import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Lobby } from "./Lobby"

const LobbyContainer = () => {
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const url = `ws://localhost:8000/matches/${matchId}/ws`
    const ws = new WebSocket(url)

    ws.onmessage = async (e) => {
      const data = JSON.parse(e.data)
      setMatch(data)

      if (data["state"] === "Finished") {
        ws.close()
      }
    }

    return () => {
      ws.close()
    }
  }, [matchId])

  return match ? <Lobby match={match} /> : <CircularProgress />
}

export default LobbyContainer

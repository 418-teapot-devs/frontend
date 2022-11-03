import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { getResults } from "./api/getResults"
import { useParams } from "react-router-dom"
import { Lobby } from "./Lobby"
import { useAuth } from "../../hooks/useAuth"

const LobbyContainer = () => {
  const { user } = useAuth()
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const url = `ws://localhost:8000/matches/${matchId}/ws`
    const ws = new WebSocket(url)

    ws.onmessage = async (e) => {
      const data = JSON.parse(e.data)
      setMatch(data)

      if (data["state"] === "Finished") {
        const response = await getResults(user.token, matchId)
        switch (response.status) {
          case 200:
            const body = await response.json()
            setMatch((match) => ({ ...match, results: body.results }))
            break
        }
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

import { CircularProgress, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Lobby } from "./Lobby"

const LobbyContainer = () => {
  const { matchId } = useParams()
  const [match, setMatch] = useState(null)
  const [connectionState, setConnectionState] = useState(WebSocket.CLOSED)

  useEffect(() => {
    setConnectionState(WebSocket.CONNECTING)
    const url = `ws://localhost:5000/matches/${matchId}`
    const ws = new WebSocket(url)

    ws.onopen = (_) => {
      setConnectionState(WebSocket.OPEN)
    }

    ws.onmessage = (e) => {
      console.log(e)
      const data = JSON.parse(e.data)
      setMatch(data)

      if (data["status"] == "finished") {
        console.log("finished")
        ws.close()
      }
    }

    ws.onclose = (_) => {
      setConnectionState(WebSocket.CLOSED)
    }

    return () => {
      setConnectionState(WebSocket.CLOSING)
      ws.close()
    }
  }, [matchId])

  return (
    <Stack>
      <p>WS Connection state: {connectionState}</p>
      {match ? <Lobby match={match} /> : <CircularProgress />}
    </Stack>
  )
}

export default LobbyContainer

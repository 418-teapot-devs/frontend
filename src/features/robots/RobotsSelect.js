import { CircularProgress, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getRobots } from "./api/getRobots"

export const RobotsSelect = ({ ...props }) => {
  const [loading, setLoading] = useState(false)
  const [robots, setRobots] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchRobots = async () => {
      setLoading(true)
      const response = await getRobots(user.token)

      switch (response.status) {
        case 200:
          const body = await response.json()
          setRobots(body)
          setLoading(false)
          break
        default:
          setLoading(false)
          break
      }
    }

    fetchRobots()
  }, [user.token])

  return loading ? (
    <CircularProgress />
  ) : (
    <TextField data-testid="robots-select" select fullWidth {...props}>
      {robots.map((robot) => (
        <MenuItem
          data-testid={`robots-select-${robot.robot_id}`}
          value={robot.robot_id}
          key={robot.robot_id}
        >
          {robot.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

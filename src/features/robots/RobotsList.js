import { React, useEffect, useState } from "react"
import { RobotBaseItem } from "./RobotBaseItem"
import { getRobots } from "./api/getRobots"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
} from "@mui/material"
import { SuccessMessage } from "../../utils/AlertMessage"

export const RobotsList = (props) => {
  const params = new URLSearchParams(document.location.search)
  const upload_success = params.get("upload_success")

  const [robots, setRobots] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchRobots = async () => {
      const response = await getRobots(user.token)

      switch (response.status) {
        case 200:
          const body = await response.json()
          setRobots(body)
          setError(null)
          break
        default:
          setError("Error en el servidor...")
          break
      }
    }

    fetchRobots()
  }, [user.token])

  return (
    <Card variant="outlined" sx={{ width: "75%" }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          Mis robots
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ m: 3 }}>
          <Button
            component={Link}
            to="/uploadbot"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Nuevo robot
          </Button>
        </Box>
        {Boolean(error) && (
          <Alert
            severity="error"
            sx={{
              justifyContent: "center",
              marginLeft: "30%",
              marginRight: "30%",
            }}
          >
            {error}
          </Alert>
        )}
        <Grid container spacing={2}>
          {robots.length === 0 && (
            <Box alignItems="center" sx={{ m: 3 }}>
              <Typography gutterBottom variant="h6" component="div">
                No tienes robots aún
              </Typography>
            </Box>
          )}
          {robots.map((robot) => (
            <Grid item xs={12} md={3} lg={3} xl={3} key={robot.robot_id}>
              <RobotBaseItem {...robot}></RobotBaseItem>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      {upload_success && (
        <SuccessMessage message="Se creó el robot con éxito" />
      )}
    </Card>
  )
}

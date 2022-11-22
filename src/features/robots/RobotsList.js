import { React, useEffect, useState } from "react"
import { RobotBaseItem } from "./RobotBaseItem"
import { getRobots } from "./api/getRobots"
import { useAuth } from "../../hooks/useAuth"
import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  Fab,
  Button,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { AlertMessage } from "../../utils/AlertMessage"

export const RobotsList = (props) => {
  const params = new URLSearchParams(document.location.search)
  const upload_success = params.get("upload_success")

  const [robots, setRobots] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

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
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={10}>
        <Card variant="outlined">
          <Fab
            data-testid="robots-list-create-robot"
            variant="extended"
            onClick={() => navigate("/uploadBot")}
            color="primary"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Crear Robot
          </Fab>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Mis robots
            </Typography>
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
                <Grid item xs={12} md={6} lg={4} xl={3} key={robot.robot_id}>
                  <RobotBaseItem {...robot}>
                    <Box display="flex" m={1} justifyContent="flex-end">
                      <Button
                        variant="contained"
                        onClick={(match) =>
                          navigate(`/robots/${robot.robot_id}`)
                        }
                      >
                        Ver Código
                      </Button>
                    </Box>
                  </RobotBaseItem>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          {upload_success && (
            <AlertMessage message="Se creó el robot con éxito" />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

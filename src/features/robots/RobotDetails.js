import {
  Button,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  Grid,
  Avatar,
  Box,
  Card,
  LinearProgress,
  CardContent,
} from "@mui/material"

import { useEffect, useState } from "react"
import { TextEditor } from "./TextEditor"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { getRobotDetails } from "./api/getRobotDetails"
import { putRobotCode } from "./api/putRobotCode"

export const RobotDetails = () => {
  const { robotId } = useParams()
  const { user } = useAuth()

  const [readOnly, setReadOnly] = useState(true)

  const [code, setCode] = useState("")
  const [robot, setRobot] = useState(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getRobotAndCode = async () => {
      setLoading(true)
      const response = await getRobotDetails(robotId, user.token)
      switch (response.status) {
        case 200:
          const body = await response.json()
          setCode(body.code)
          setRobot(body.robot_info)
          setError(false)
          setLoading(false)
          break

        case 404:
          setLoading(false)
          setError("El robot no existe")
          break

        case 403:
          setError("El robot no es tuyo")
          break

        default:
          setLoading(false)
          setError("Error desconocido")
          break
      }
    }
    getRobotAndCode()
  }, [user.token, robotId])

  const submitCode = async () => {
    setLoading(true)
    const response = await putRobotCode(code, robotId, user.token)
    const detail = response.statusText.toString()

    switch (response.status) {
      case 200:
        setError(null)
        setLoading(false)
        setReadOnly(true)
        break

      case 418:
        setLoading(false)
        if (detail.includes("Forbidden functions or imports found in code"))
          setError("El código incluye funiones o imports no autorizados")
        else if (detail.includes("Syntax error")) setError("Error de sintaxis")
        else if (
          detail.includes("Invalid name for method or attribute of robot")
        )
          setError("Nombre de método o atributo de robot inválido")
        else
          setError(
            "El código debe definir exactamente una clase que herede de Robot"
          )
        break
      default:
        setLoading(false)
        setError("Error Desconocido")
        break
    }
  }

  if (Boolean(error) || !Boolean(robot)) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Alert severity="error">
            <AlertTitle severity="error">{error}</AlertTitle>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
                <Avatar
                  src={"http://localhost:8000" + robot.avatar_url}
                  sx={{ width: 90, height: 90 }}
                />
                <Typography variant="h5">{robot.name}</Typography>
                <Box sx={{ minWidth: "70%", maxWidth: "100%" }}>
                  {loading &&  <LinearProgress/>}
                  <TextEditor
                    code={code}
                    setCode={setCode}
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    robot={robot}
                  />

                  {readOnly && (
                    <Button
                      sx={{ width: "100%" }}
                      onClick={() => setReadOnly(!readOnly)}
                    >
                      Editar
                    </Button>
                  )}
                  {!readOnly && (
                    <Button
                      sx={{ width: "100%" }}
                      onClick={submitCode}
                      disabled={code === ""}
                    >
                      Subir código
                    </Button>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}
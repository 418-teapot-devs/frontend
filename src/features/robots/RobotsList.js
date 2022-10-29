import { React, useEffect, useState, Redirect } from "react"
import { RobotBaseItem } from "./RobotBaseItem"
import { getRobots } from "./api/getRobots"
import { useAuth } from "../../hooks/useAuth"
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material"


var robotsCardStyle = {
  display: 'block',
  transitionDuration: '0.3s',
  height: '100vw',
  overflow: 'scroll'
}

export const RobotsList = (props) => {

  const [loading, setLoading] = useState(false)
  const [robots, setRobots] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchRobots = async () => {
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

  return(
    <Card variant="outlined" style={robotsCardStyle} >
      <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Mis robots
          </Typography>
          <Box display="flex" justifyContent="flex-end" > 
            <Button component={Link} to="/uploadbot" variant="overline" color="primary">
              Nuevo robot
            </Button>
          </Box>
      <Grid container spacing={1}>
          {robots.map((robot) => (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <RobotBaseItem {...robot}>
              </RobotBaseItem>
            </Grid>
          ))}
      </Grid>
      </CardContent>
    </Card>
  )
}
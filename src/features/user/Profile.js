import React from "react"
import { useSelector } from "react-redux"
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material"
import { selectLoginLoading, selectToken } from "./userSlice"

export const Profile = () => {
  const token = useSelector(selectToken)
  const loading = useSelector(selectLoginLoading)

  return (
    <Card>
      <CardMedia
        component="img"
        height="280"
        image={token}
      />
      <CardContent>
        {
          loading ? <CircularProgress /> : <React.Fragment>
            <Typography gutterBottom variant="h5" component="div">
              Perfil
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Token: {token}
            </Typography>
          </React.Fragment>
        }
      </CardContent>
    </Card>
  )
}

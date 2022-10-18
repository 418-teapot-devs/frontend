import React from "react"
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material"

import { useAuth } from "../../hooks/useAuth"

export const Profile = () => {
  const { user } = useAuth()

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Token: {user.token}
        </Typography>
      </CardContent>
    </Card>
  )
}

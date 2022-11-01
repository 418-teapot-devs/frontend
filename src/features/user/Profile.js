import React from "react"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material"

import { useAuth } from "../../hooks/useAuth"

export const Profile = () => {
  const { user } = useAuth()

  return (
    <Grid container spacing={3} justifyContent="center">
    <Grid item xs={12} md={6} marginTop={10}>
    <Card>
      <CardContent>
        <Box textAlign="center">
        <Typography gutterBottom variant="h5" component="div" color="#1876D2">
          Perfil
        </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
        <Avatar src={"http://localhost:8000" + user.profile.avatar_url} 
        sx={{ width: 80, height: 80 }}/>
        <Stack direction="column">
        <Typography gutterBottom variant="h6" component="div">
          Nombre de usuario: @{user.profile.username}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Correo electrónico: {user.profile.email}
        </Typography>
        </Stack>
        </Stack>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
  )
}

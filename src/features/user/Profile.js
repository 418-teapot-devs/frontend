import React, { useState } from "react"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"

import { useAuth } from "../../hooks/useAuth"
import { updateavatar } from "./api/updateavatar"

export const Profile = () => {
  const { user, setProfile } = useAuth()
  const [error, setError] = useState(null)

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0]
    const response = updateavatar(avatar, user.token)

    switch(response.status) {
      case 200:
        const user = response.json()
        setProfile(user)
        break
      default:
        setError("Error en el servidor...")
        break
    }
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6} marginTop={10}>
        <Card>
          <CardContent>
            <Box textAlign="center">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="#1876D2"
              >
                Perfil
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <IconButton
                variant="outlined"
                component="label"
              >
                <Avatar
                  src={user.profile.avatar_url}
                  sx={{ width: 80, height: 80 }}
                />
                <input
                  hidden
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  aria-label="avatar"
                  type="file"
                  onChange={handleAvatarChange}
                />
              </IconButton>
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

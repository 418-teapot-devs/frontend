import React from "react"
import { useSelector } from "react-redux"
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material"
import {
  selectUserLoginLoading,
  selectUserProfile,
  selectUserToken,
} from "./userSlice"

export const Profile = () => {
  const token = useSelector(selectUserToken)
  const loading = useSelector(selectUserLoginLoading)
  const profile = useSelector(selectUserProfile)

  return (
    <Card>
      <CardMedia component="img" height="280" image={profile.avatar_url} />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <Typography gutterBottom variant="h5" component="div">
              @{profile.username}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
              Token: {token}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {profile.email}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
}

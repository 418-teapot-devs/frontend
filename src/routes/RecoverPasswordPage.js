import { Grid } from "@mui/material"
import RecoverPassword from "../features/user/RecoverPassword"

export const RecoverPasswordPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={9} lg={3} sx={{ marginTop: 20 }}>
        <RecoverPassword />
      </Grid>
    </Grid>
  )
}

export default RecoverPasswordPage

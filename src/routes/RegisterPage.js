import { Grid, Link, Card, Box,Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Register } from "../features/user/Register"

export const RegisterPage = () => {
  const navigate = useNavigate()
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={9} lg={3} sx={{ marginTop: 4 }}>
        <Card variant="outlined">
          <Register />
          <Box textAlign="center">
            <Button onClick={() => navigate("/login")}>
              <Typography variant="overline">¿Ya tienes cuenta?</Typography>
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RegisterPage

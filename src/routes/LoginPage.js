import { Grid, Box, Button, Typography, Card} from "@mui/material"
import { Login } from "../features/user/Login"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={9} lg={3} sx={{ marginTop: 20 }}>
        <Card variant="outlined">
          <Login />
          <Box textAlign="center">
            <Button onClick={() => navigate("/register")}>
              <Typography variant="overline">Crear cuenta</Typography>
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginPage

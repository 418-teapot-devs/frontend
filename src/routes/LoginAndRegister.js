import { Grid } from "@mui/material"
import { Login } from "../features/user/Login"
import { Register } from "../features/user/Register"

export  const LoginAndRegister = () => {
  return(
  <Grid
    container
    alignItems="center"
    spacing={2}>
    <Grid item xs={6}>
      <div style={{margin: '3vw'}}>
        <Login/>
      </div>
    </Grid>
    <Grid item xs={6}>
      <div style={{margin: '3vw'}}>
        <Register/>
      </div>
    </Grid>
  </Grid>
  )
}

export default LoginAndRegister
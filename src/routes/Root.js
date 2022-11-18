import { Grid, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import SideBar, { SIDEBAR_WIDTH } from "./SideBar"

export const Root = () => {
  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <SideBar />
      <Grid
        container
        sx={{
          padding: 1,
          pl: `calc(${SIDEBAR_WIDTH}px + 16px)`,
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Grid>
    </Stack>
  )
}

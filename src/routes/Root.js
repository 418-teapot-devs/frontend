import { Box, Grid, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export const Root = () => {
  return (
    <Stack sx={{ height: "100%" }} spacing={0} direction="row">
      <Box sx={{ padding: 1 }}>
        <SideBar />
      </Box>
      <Box sx={{ padding: 4, width:'100%'}}>
        <Outlet />
      </Box>
    </Stack>
  )
}

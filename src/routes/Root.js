import { Box, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export const Root = () => {
  return (
    <Stack sx={{ height: "100% " }} spacing={10} direction="row">
      <Box sx={{ height: "100vh", padding: 1 }}>
        <SideBar />
      </Box>
      
      <Box sx={{ padding: 1, width:'70%'}}>
        <Outlet />
      </Box>
    </Stack>
  )
}

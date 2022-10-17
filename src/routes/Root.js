import { Box, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export const Root = () => {
  return (
    <Stack sx={{ height: "100% " }} direction="row">
      <Box sx={{ height: "100vh", padding: 1 }}>
        <SideBar />
      </Box>
      <Box sx={{ padding: 1 }}>
        <Outlet />
      </Box>
    </Stack>
  )
}

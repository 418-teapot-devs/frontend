import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material"

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const mainOptions = [
  {
    title: "Inicio",
    to: "",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Robots",
    to: "robots",
    icon: <SmartToyOutlinedIcon />,
  },
  {
    title: "Partidas",
    to: "matches",
    icon: <PlayCircleOutlineOutlinedIcon />,
  },
  {
    title: "Simulación",
    to: "simulation",
    icon: <GridOnOutlinedIcon />,
  },
]

const extraOptions = [
  {
    title: "Perfil",
    to: "/profile",
    icon: <PersonOutlinedIcon />,
  },
]

const SideBarItem = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.onClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.title}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export const SideBar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Paper sx={{ height: "100%" }} variant="outlined">
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <List>
          {mainOptions.map((option) => (
            <SideBarItem
              key={option.title}
              {...option}
              onClick={() => navigate(option.to)}
            />
          ))}
        </List>
        <List>
          {extraOptions.map((option) => (
            <SideBarItem
              key={option.title}
              {...option}
              onClick={() => navigate(option.to)}
            />
          ))}
          <SideBarItem
            title="Cerrar Sesión"
            icon={<LogoutOutlinedIcon />}
            onClick={logout}
          />
        </List>
      </Stack>
    </Paper>
  )
}

export default SideBar

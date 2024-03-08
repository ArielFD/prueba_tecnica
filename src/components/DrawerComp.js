import { ChevronLeft } from "@mui/icons-material";
import {
  IconButton,
  List,
  Toolbar,
  Avatar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { secondaryListItems } from "./listItems";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerwidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    background: "#f5f5f5",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      //   width: theme.spacing(7),
      //   [theme.breakpoints.up("sm")]: {
      //     width: theme.spacing(9),
      //   },
    }),
  },
}));

export default function DrawerComp({
  open,
  toggleDrawer,
  drawerwidth,
  usuario,
}) {
  return (
    <Drawer
      variant="permanent"
      open={open}
      drawerwidth={drawerwidth}
      sx={{ bgcolor: "primary.main", height: "100vh" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <List
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src="/broken-image.jpg"
          sx={{ width: 200, height: 200, m: 2 }}
        />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, marginRight: "10px", fontWeight: "bold" }}
        >
          {usuario}
        </Typography>
        <Divider sx={{ my: 1, width: "100%" }} />
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Menu
        </Typography>
        <Divider sx={{ my: 1, width: "100%" }} />
        <Box sx={{ textAlign: "left" }}>{secondaryListItems}</Box>
      </List>
    </Drawer>
  );
}

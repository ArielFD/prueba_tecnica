import { IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerwidth,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComp({
  open,
  toggleDrawer,
  drawerwidth,
  usuario,
}) {
  function cleanUserRegister(params) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  }
  return (
    <AppBar
      position="absolute"
      open={open}
      drawerwidth={drawerwidth}
      sx={{
        bgcolor: "black",
        borderBottom: 3,
        borderColor: "primary.main",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "10px",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          COMPANIA PRUEBA
        </Typography>
        <div>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, marginRight: "10px" }}
          >
            {usuario}
          </Typography>
        </div>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <IconButton onClick={cleanUserRegister} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

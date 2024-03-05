import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import DrawerComp from "./components/DrawerComp";
import AppBarComp from "./components/AppBarComp";

const drawerwidth = 340;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Layout = React.memo(({ children }) => {
  const userName  = localStorage.getItem("username");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  // const isInicio =
  //   location.pathname === "/consultas" ||
  //   location.pathname.startsWith === "/mantenimientos"
  const isInicio = /^\/(consultas|mantenimientos($|\/))/.test(
    location.pathname
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComp
          drawerwidth={drawerwidth}
          open={open}
          toggleDrawer={toggleDrawer}
          usuario={userName}
        />
        <DrawerComp
          drawerwidth={drawerwidth}
          open={open}
          toggleDrawer={toggleDrawer}
          usuario={userName}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            alignItems: isInicio ? "normal" : "center",
            justifyContent: isInicio ? "normal" : "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
});

export default Layout;

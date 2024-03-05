import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RoofingIcon from "@mui/icons-material/Roofing";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";

export const secondaryListItems = (
  <React.Fragment>
    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <RoofingIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="INICIO" />
      </ListItemButton>
    </Link>
    <Link to="/consultas" style={{ textDecoration: "none", color: "black" }}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Consulta Clientes" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
// import logo from "./../../assests/images/logo.jpeg";
import { Dashboard } from "@mui/icons-material";
import logo from "./../../assests/images/dkg_logo.png";

const Sidebar: React.FC = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} width="auto" height="65" alt="Kodie" />
      </div>

      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <Dashboard />
            <ListItemText primary="Generate QR" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

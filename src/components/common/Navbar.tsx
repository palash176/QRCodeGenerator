// Navbar.tsx
import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface AppBarProps extends MuiAppBarProps {
  handleDrawerOpen: () => void;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== "handleDrawerOpen" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, handleDrawerOpen, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
}));

const Navbar: React.FC<AppBarProps> = ({ handleDrawerOpen, drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      handleDrawerOpen={handleDrawerOpen}
      drawerWidth={drawerWidth}
      className="NavbarResponsive"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Dynamic QR
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Switch } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../context/ThemeContext";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Pokedex
        </Typography>
        <IconButton edge="end" color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        <Switch
          className="theme-toggle"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

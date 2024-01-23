import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useThemeContext } from "../state/use-theme-context";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  return (
    <Tooltip title={isDarkMode ? "Use Light mode" : "Use Dark mode"}>
      <IconButton size="small" onClick={() => toggleDarkMode()}>
        {isDarkMode ? (
          <Brightness3Icon />
        ) : (
          <WbSunnyOutlinedIcon sx={{ color: "#ffffff" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;

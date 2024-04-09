import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useThemeContext } from "../state/use-theme-context";

const DarkModeToggle = ({ scrollPastImage }) => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  return (
    <Tooltip title={isDarkMode ? "Use Light mode" : "Use Dark mode"}>
      <IconButton size="small" onClick={() => toggleDarkMode()}>
        {isDarkMode ? (
          <Brightness3Icon />
        ) : (
          <WbSunnyOutlinedIcon
            sx={{ color: scrollPastImage ? "#000000" : "#ffffff" }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;

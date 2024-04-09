import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <BottomNavigation
      showLabels
      sx={{ backgroundColor: "#e8ebf4", height: "70px", marginTop: "auto" }}
    >
      <BottomNavigationAction label="Information" />
      <BottomNavigationAction label="Customer Support" />
      <BottomNavigationAction label="Have a Question?" />
    </BottomNavigation>
  );
};

export default Footer;

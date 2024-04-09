import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

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

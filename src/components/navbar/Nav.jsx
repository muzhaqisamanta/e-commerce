import React from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "@mui/material";

const Nav = () => {
  return (
    // <AppBar position="fixed" width="50%">
    <Toolbar>
      <Stack
        direction="row"
        style={{
          width: "50%", // Take 50% of the page width
          margin: "0 auto", // Center the stack horizontally
          borderRadius: "10px", // Add a radius
          backgroundColor: "#fff", // Background color for the stack
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Box shadow for styling
          padding: "10px 20px",
        }}
      >
        <Stack direction="row">
          <Button
            color="inherit"
            variant="text"
            //   onClick={() => navigate("/")}
          >
            CAR RENTAL
          </Button>
          <Button
            color="inherit"
            variant="text"
            //   onClick={() => navigate("/about-us")}
          >
            About us
          </Button>
          <Button
            color="inherit"
            variant="text"
            //   onClick={handleClickOpenContact}
          >
            Contact
          </Button>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {/* {!user && ( */}
          <Button
            color="inherit"
            variant="outlined"
            // onClick={() => navigate("/log-in")}
          >
            Log In
          </Button>
          {/* )} */}
          {/* <DarkModeToggle /> */}
          <Avatar onClick={(e) => handleOpenProfile(e)} />
        </Stack>
      </Stack>
    </Toolbar>
    // </AppBar>
  );
};

export default Nav;

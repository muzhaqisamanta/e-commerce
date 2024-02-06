import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarMenu from "../components/NavBarMenu";
import DarkModeToggle from "../components/DarkModeToggle";
import Contact from "../components/Contact";
import Profile from "../components/Profile";
import HideOnScroll from "../components/HideOnScroll";
import { AppBar } from "../styled-components/StyledComponents";
import {
  getStatus,
  getUser,
  userLogout,
  getLoggedUser,
} from "../redux/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userStatus = useSelector(getStatus);
  const user = useSelector(getLoggedUser);

  useEffect(() => {
    if (userStatus === "succeeded") {
      dispatch(getUser());
    }
  }, [userStatus]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userLogout());
      setAnchorEl(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleClickOpenContact = () => {
    setOpenContact(true);
  };

  const handleOpenProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Stack direction="row">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => navigate("/")}
                >
                  E-Commerce
                </Button>
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => navigate("/about-us")}
                >
                  About us
                </Button>
                <Button
                  color="inherit"
                  variant="text"
                  onClick={handleClickOpenContact}
                >
                  Contact
                </Button>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                {!user && (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => navigate("/log-in")}
                  >
                    Log In
                  </Button>
                )}
                <DarkModeToggle />
                <Avatar onClick={(e) => handleOpenProfile(e)} />
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Contact open={openContact} setOpen={setOpenContact} />
      <Profile
        handleLogout={handleLogout}
        user={user}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <NavBarMenu open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
};

export default NavBar;

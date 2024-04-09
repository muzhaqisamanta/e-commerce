import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { getUser, userLogout } from "../redux/userSlice";
import { Typography } from "@mui/material";
import logo from "../utils/logo.png";
import { useTheme } from "@emotion/react";

const NavBar = () => {
  console.log("?????NAVBAR?????");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userToken = localStorage.getItem("userToken");
  const user = useSelector((state) => state.user.user, shallowEqual);
  const theme = useTheme();
  const avatarColor = theme.palette.primary.main;
  useEffect(() => {
    const fetchUser = async () => {
      if (userToken && !user) {
        try {
          await dispatch(getUser());
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    console.log("test");
    fetchUser();
  }, [dispatch, userToken, user]);

  const fetchUser = async () => {
    if (userToken && !user) {
      try {
        await dispatch(getUser());
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const memoizedFetchUser = useMemo(
    () => fetchUser,
    [dispatch, userToken, user]
  );

  useEffect(() => {
    console.log("test");
    memoizedFetchUser();
  }, [memoizedFetchUser]);

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

  const [scrollPastImage, setScrollPastImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setScrollPastImage(true);
      } else {
        setScrollPastImage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 16,
              backgroundColor: scrollPastImage ? "#e8ebf4" : null,
              boxShadow: "none",
            }}
          >
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Stack direction="row">
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => navigate("/")}
                  startIcon={<img src={logo} width={25} height={25} />}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={scrollPastImage ? "text.primary" : "inherit"}
                  >
                    CAR RENTAL
                  </Typography>
                </Button>
              </Stack>
              <Stack direction={"row"} spacing={3}>
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => navigate("/about-us")}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={scrollPastImage ? "text.primary" : "inherit"}
                  >
                    About us
                  </Typography>
                </Button>
                <Button
                  color="inherit"
                  variant="text"
                  onClick={handleClickOpenContact}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={scrollPastImage ? "text.primary" : "inherit"}
                  >
                    Contact
                  </Typography>
                </Button>
              </Stack>
              <Stack direction={"row"} spacing={3}>
                {!user && (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => navigate("/log-in")}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color={scrollPastImage ? "text.primary" : "inherit"}
                    >
                      Log In
                    </Typography>
                  </Button>
                )}
                <DarkModeToggle scrollPastImage={scrollPastImage} />
                <Avatar
                  onClick={(e) => handleOpenProfile(e)}
                  color={avatarColor}
                />
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
      {/* <NavBarMenu open={open} handleDrawerClose={handleDrawerClose} /> */}
    </>
  );
};

export default NavBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Profile = ({ anchorEl, setAnchorEl, user, handleLogout }) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const stringAvatar = (name) => {
    if (!name) return {};
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Stack
        direction="column"
        sx={{ width: "300px", minHeight: "200px" }}
        alignItems="center"
        spacing={2}
      >
        {!!user ? (
          <>
            <Stack
              sx={{
                width: "100%",
                height: "70px",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "black",
              }}
            >
              <Divider sx={{ width: "300px" }}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                />
              </Divider>
            </Stack>
            <Stack>
              <Typography align="center">
                {user.firstName} {user.lastName}
              </Typography>{" "}
            </Stack>
            <Divider sx={{ width: "300px" }} />
            <Stack>
              <Typography align="center">{user.email}</Typography>
            </Stack>
            <Divider sx={{ width: "300px" }} />
            <Stack>
              <Button
                onClick={() => {
                  navigate("/profile");
                  setAnchorEl(null);
                }}
                variant="outlined"
                sx={{ width: "200px" }}
              >
                Manage my account
              </Button>
            </Stack>
            <Divider sx={{ width: "300px" }} />
            <Stack sx={{ pb: 2 }}>
              <Button variant="contained" onClick={handleLogout}>
                Log out
              </Button>
            </Stack>
          </>
        ) : (
          <Stack
            spacing={3}
            sx={{
              width: "100%",
              minHeight: "200px",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <Typography align="center" variant="h6">
              No User! Please log in to access your account.
            </Typography>{" "}
            <Divider sx={{ width: "300px" }} />
            <Button
              variant="contained"
              onClick={() => {
                navigate("/log-in");
                setAnchorEl(null);
              }}
            >
              Log In
            </Button>
          </Stack>
        )}
      </Stack>
    </Popover>
  );
};
export default Profile;

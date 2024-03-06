import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { deleteUser, getLoggedUser, getStatus } from "../redux/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(getStatus);
  const user = useSelector(getLoggedUser);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  if (userStatus === "loading") return <>Loading user data</>;
  if (userStatus === "failed" || !user) return <>No user logged</>;

  return (
    <Grid container spacing={2}>
      User data
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          readOnly
          label="Username"
          value={user.username}
          fullWidth
          autoFocus
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          readOnly
          value={user.firstName}
          fullWidth
          label="First Name"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField value={user.lastName} fullWidth readOnly label="Last Name" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={user.email}
          readOnly
          fullWidth
          label="Email Address"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField value={user.city} readOnly fullWidth label="City" />
      </Grid>
      <Grid item xs={4}>
        <TextField
          readOnly
          value={user.country}
          fullWidth
          label="Country"
          autoComplete="country"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          readOnly
          value={user.address}
          fullWidth
          label="Address"
          autoComplete="address"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          readOnly
          value={user.phoneNumber}
          fullWidth
          label="Phone number"
          autoComplete="phone number"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          onClick={() => navigate("/profile")}
          variant="contained"
          color="primary"
        >
          Manage my posts
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete User
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserProfile;

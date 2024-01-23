import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { getStatus, getUserId } from "../redux/userSlice";
import { registerUser } from "../redux/userSlice";
import { Alert, AlertTitle, Snackbar, formControlClasses } from "@mui/material";

export default function SignUp() {
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    email: false,
    phoneNumber: false,
  });
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
  });
  const status = useSelector(getStatus);

  useEffect(() => {
    if (!!status?.message) {
      setShowAlert(true);
    }
  }, [status]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFieldEmpty = (field) => {
    return userData[field].trim() === "";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: value.trim() === "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const emptyFields = Object.keys(error).filter(
        (key) => userData[key].trim() === ""
      );
      setError((prevError) => ({
        ...prevError,
        ...emptyFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      }));
      if (emptyFields.length > 0) {
        return;
      }
      await dispatch(registerUser(userData));
      navigate(`/log-in`);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={!!error.username}
                onChange={handleInput}
                value={userData.username}
                name="username"
                required
                fullWidth
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleInput}
                value={userData.firstName}
                fullWidth
                label="First Name"
                name="firstName"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                onChange={handleInput}
                value={userData.lastName}
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!error.email}
                onChange={handleInput}
                value={userData.email}
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!error.password}
                onChange={handleInput}
                value={userData.password}
                autoComplete="new-password"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInput}
                value={userData.city}
                fullWidth
                label="City"
                name="city"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInput}
                value={userData.country}
                fullWidth
                label="Country"
                name="country"
                autoComplete="country"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInput}
                value={userData.address}
                fullWidth
                label="Address"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!error.phoneNumber}
                onChange={handleInput}
                value={userData.phoneNumber}
                required
                fullWidth
                label="Phone number"
                name="phoneNumber"
                autoComplete="phone number"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => handleSubmit(e)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/log-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            <Snackbar
              sx={{ minWidth: "600px" }}
              onClose={() => setShowAlert(false)}
              autoHideDuration={5000}
              open={showAlert}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="error" sx={{ minWidth: "600px" }}>
                <AlertTitle>Error</AlertTitle>
                {status?.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

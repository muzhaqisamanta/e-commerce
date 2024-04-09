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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { getStatus } from "../redux/userSlice";
import { registerUser } from "../redux/userSlice";
import useSignUpForm from "../state/use-signup-form";
import Reveal from "../components/Reveal";

export default function SignUp() {
  const {
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useSignUpForm();

  const [showAlert, setShowAlert] = useState(false);

  const status = useSelector(getStatus);

  useEffect(() => {
    if (!!status?.message) {
      setShowAlert(true);
    }
  }, [status]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      const isValid = await trigger("userData");
      if (!isValid) {
        return;
      }
      await dispatch(registerUser(getValues("userData")));
      navigate(`/log-in`);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Reveal>
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
                  {...register("userData.username")}
                  error={!!errors.userData?.username}
                  helperText={errors.userData?.username?.message}
                  required
                  fullWidth
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("userData.firstName")}
                  error={!!errors.userData?.firstName}
                  helperText={errors.userData?.firstName?.message}
                  fullWidth
                  label="First Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("userData.lastName")}
                  error={!!errors.userData?.lastName}
                  helperText={errors.userData?.lastName?.message}
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userData.email")}
                  error={!!errors.userData?.email}
                  helperText={errors.userData?.email?.message}
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userData.password")}
                  error={!!errors.userData?.password}
                  helperText={errors.userData?.password?.message}
                  autoComplete="new-password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register("userData.city")}
                  error={!!errors.userData?.city}
                  helperText={errors.userData?.city?.message}
                  fullWidth
                  label="City"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register("userData.country")}
                  error={!!errors.userData?.country}
                  helperText={errors.userData?.country?.message}
                  fullWidth
                  label="Country"
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register("userData.address")}
                  error={!!errors.userData?.address}
                  helperText={errors.userData?.address?.message}
                  fullWidth
                  label="Address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("userData.phoneNumber")}
                  error={!!errors.userData?.phoneNumber}
                  helperText={errors.userData?.phoneNumber?.message}
                  required
                  fullWidth
                  label="Phone number"
                  autoComplete="phone number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
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
      </Reveal>
    </Container>
  );
}

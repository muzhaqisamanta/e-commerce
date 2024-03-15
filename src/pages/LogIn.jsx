import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  authenticateUser,
  getStatus,
  getUser,
  getUserError,
} from "../redux/userSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [clickButton, setClickButton] = useState(false);
  const [error, setError] = useState({ username: false, password: false });

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setError((prevError) => ({ ...prevError, [name]: !value }));
  };

  const userStatus = useSelector(getStatus);
  const userError = useSelector(getUserError);
  const isFormOpen = !!localStorage.getItem("postdata");

  const handleLogIn = async (e) => {
    e.preventDefault();
    await dispatch(authenticateUser(userData));
    isFormOpen && navigate("/add-post");
    setClickButton(true);
  };

  useEffect(() => {
    if (userStatus === "failed" && clickButton) {
      setSnackbarMessage(userError);
      setSnackbarOpen(true);
      setClickButton(false);
    }
    if (userStatus === "succeeded" && clickButton) {
      setClickButton(false);
      dispatch(getUser());
      navigate("/");
    }
  }, [clickButton]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="error"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={handleInput}
            error={error.username}
            value={userData.username}
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            onChange={handleInput}
            value={userData.password}
            error={error.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={(e) => handleLogIn(e)}
            fullWidth
            variant="contained"
            disabled={error.username || error.password}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;

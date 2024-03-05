import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth_store";
import { Snackbar } from "@mui/base";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { setJWT, setUser } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleMailChange = (event) => {
    setmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      identifier: data.get("email"),
      password: data.get("password"),
    };

    login(userData);
    if (rememberMe) {
      localStorage.setItem("rememberMe", true);
      localStorage.setItem("email", data.get("email"));
      localStorage.setItem("password", data.get("password"));
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  async function login(userData) {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        userData
      );
      console.log("response", response);
      navigate("/");

      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("username", response.data.user.username);

      setJWT(response.data.jwt);
      setUser(response.data.user.username);
    } catch (error) {
      // En caso de error, maneja el error adecuadamente
      console.error("Error al registrar usuario:", error);
      throw error; // Puedes lanzar el error para que sea manejado por la capa superior
    }
  }

  useEffect(() => {
    if (localStorage.getItem("rememberMe")) {
      setRememberMe(true);
      setmail(localStorage.getItem("email"));
      setpass(localStorage.getItem("password"));
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={mail}
              onChange={handleMailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
// Login;

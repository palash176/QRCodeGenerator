// import React, { useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import { Navigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       // Perform the login API call and retrieve the user role
//       // const response = await axios.post('/login', { username, password });
//       // const role = response.data.role;

//       // Simulate the login process with a dummy role
//       const role = [1,2,3,4,5,6,7];

//       // Store the user role in local storage
//       localStorage.setItem('userRole', JSON.stringify(role));

//       // Redirect to appropriate page based on role
//       return <Navigate to="/" replace />;
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <TextField
//         label="Username"
//         variant="outlined"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <TextField
//         label="Password"
//         variant="outlined"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button type="submit" variant="contained">
//         Login
//       </Button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default Login;

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
import { Card, CardContent } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
const defaultTheme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername === "admin@dkg" && storedPassword === "dkg123") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
   
    if (username === "admin@dkg" && password === "dkg123") {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      const role = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

      // Store the user role in local storage
      localStorage.setItem("userRole", JSON.stringify(role));

      setIsLoggedIn(true);
      window.location.reload();
    } else {
      alert("Invalid username or password");
      console.log("Invalid username or password");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("password");
  //   setIsLoggedIn(false);
  // };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Card>
        <CardContent>
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
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="textField"
                  label="Username"
                  name="Username"
                  autoComplete="textField"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
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
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState("Enter username");
  const [password, setPassword] = useState("Enter Password");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="home-page">
      <Container maxWidth="sm" className="login-container">
        <Typography variant="h4" component="h1" gutterBottom className="title">
          Chachu Super Store !!!
        </Typography>

        <Paper elevation={3} className="login-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <MuiAlert severity="error" onClose={() => setError(null)}>
              {error}
            </MuiAlert>
          </Snackbar>
        )}

        {success && (
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <MuiAlert severity="success" onClose={() => setSuccess(false)}>
              Login successful!
            </MuiAlert>
          </Snackbar>
        )}
      </Container>
    </Box>
  );
};

export default LoginPage;

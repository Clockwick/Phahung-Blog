/* eslint-disable no-console */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Box,
  TextField,
  Paper,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router';
import { useUser } from '../store/hooks/userHook';

const Signin: React.FC = () => {
  // use state constants for the the form inputs
  const history = useHistory();
  const { fetchSessionHandler, isLoggedIn } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginToApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchSessionHandler();
  };

  // A quick check on the name field to make it mandatory
  const handleSubmit = () => {
    console.log('submit');
  };
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '80vh',
          width: '70vw',
          mx: 'auto',
        }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1595495529260-5d01d0271714?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginToApp}
              >
                Sign In
              </Button>
            </Box>
            <Grid item>
              <Link href="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signin;

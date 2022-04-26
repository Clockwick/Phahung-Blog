/* eslint-disable no-console */
/* eslint-disable */
import React, { FormEvent, useEffect, useState } from 'react';
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
import api from 'src/utils/api';

const Signin: React.FC = () => {
  // use state constants for the the form inputs
  const history = useHistory();
  const { fetchSessionHandler, isLoggedIn } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginToApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchSessionHandler();
  };

  // A quick check on the name field to make it mandatory

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let validate = true;
    if (email === '') {
      setEmailError('Email is required');
      validate = false;
    } else {
      setEmailError('');
    }
    if (password === '') {
      setPasswordError('Password is required');
      validate = false;
    } else {
      setPasswordError('');
    }

    if (!validate) return;

    api({
      url: '/signin',
      method: 'POST',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const idToken = res.data as string;
          localStorage.setItem('idToken', idToken);
          fetchSessionHandler();
        }
      })
      .catch(() => {
        setPasswordError('Invalid email or password');
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
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
            backgroundImage: 'url(/assets/images/bg.png)',
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
                error={emailError.length > 0}
                helperText={emailError}
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
                error={passwordError.length > 0}
                helperText={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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

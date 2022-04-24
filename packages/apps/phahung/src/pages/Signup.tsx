import React, { FormEvent, useState } from 'react';
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Box,
  TextField,
  Container,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import api from 'src/utils/api';
import { useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

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

    if (firstName === '') {
      setFirstNameError('First name is required');
      validate = false;
    } else {
      setFirstNameError('');
    }

    if (lastName === '') {
      setLastNameError('Last name is required');
      validate = false;
    } else {
      setLastNameError('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('Confirm Password is required');
      validate = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Password does not match');
      validate = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!validate) return;

    api({
      url: '/signup',
      method: 'POST',
      data: {
        email,
        password,
        firstName,
        lastName,
        role: 1,
      },
    }).then((res) => {
      if (res.status === 200) {
        history.push('/signin');
      }
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ลงทะเบียน
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ชื่อจริง"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={firstNameError.length > 0}
                  helperText={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="นามสกุล"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={lastNameError.length > 0}
                  helperText={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="อีเมล"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError.length > 0}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError.length > 0}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="ยืนยันรหัสผ่าน"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError.length > 0}
                  helperText={confirmPasswordError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ลงทะเบียน
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup">ลงทะเบียนแล้วใช่ไหม ? ล็อกอินเลย</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;

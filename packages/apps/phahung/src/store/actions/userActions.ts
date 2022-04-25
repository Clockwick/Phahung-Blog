import { createAsyncThunk } from '@reduxjs/toolkit';

import api from 'src/utils/api';

// import userApiCall from '../api/user/userApiCall';

import { User } from '../types';

export const fetchSession = createAsyncThunk('user/fetchSession', async () => {
  /* for production */
  const user = await api<User>({
    method: 'post',
    url: '/get-session',
    headers: {
      authorization: `Bearer ${localStorage.getItem('idToken')}`,
    },
  });
  return user.data;
});

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  /* for production */
  localStorage.removeItem('idToken');
  //   .logout()
  //   .then((res) => {
  //     console.log('Logout response', res.data);
  //   })
  //   .catch((err) => console.log('Logout Error', err));
});

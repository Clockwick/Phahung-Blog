import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/utils/api';

// import { userApiCall } from '../../api';

import { User } from '../types';

export const fetchSession = createAsyncThunk('user/fetchSession', async () => {
  /* for production */
  const user = await api<User>({
    method: 'post',
    url: '/get-session',
    headers: {
      authorization: `Bearer ${localStorage.getItem('idToken')}`,
    },
    withCredentials: true,
  });
  return user;
  // const user: User = {
  //   id: '61e117bcbb06b63455356b30',
  //   picture: '/assets/man.png',
  //   firstName: 'Pims',
  //   lastName: 'Piyajiranan',
  //   email: 'test1234@gmail.com',
  //   role: 'admin',
  //   isBan: false,
  // };
  // return user;
});

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  /* for production */
  localStorage.removeItem('idToken');
  // return userApiCall
  //   .logout()
  //   .then((res) => {
  //     console.log('Logout response', res.data);
  //   })
  //   .catch((err) => console.log('Logout Error', err));
});

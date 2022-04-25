import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApiCall } from '../../api';
import { User } from '../types';

interface IUser {
  user: User;
}

export const fetchSession = createAsyncThunk('user/fetchSession', async () => {
  /* for production */
  const res = await userApiCall.getSession();
  return res.data;
  // const { user } = res.data as IUser;
  // const user: User = {
  //   id: '111',
  //   firstName: 'Phan',
  //   lastName: 'Hung',
  //   email: 'phahung@gmail.com',
  //   image: '/assets/image/Avatar.png',
  //   role: 'Admin',
  // };
  // return user;
});

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  /* for production */
  userApiCall.logout().finally(() => {
    localStorage.removeItem('idToken');
  });
});

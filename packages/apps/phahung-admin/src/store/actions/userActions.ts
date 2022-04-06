import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApiCall } from '../../api';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}
interface IUser {
  user: User;
}

export const fetchSession = createAsyncThunk('user/fetchSession', async () => {
  /* for production */
  const res = await userApiCall.getSession();
  const { user } = res.data as IUser;
  return user;
});

export const fetchLogout = createAsyncThunk('user/fetchLogout', async () => {
  /* for production */
  userApiCall.logout().finally(() => {
    localStorage.removeItem('idToken');
  });
});

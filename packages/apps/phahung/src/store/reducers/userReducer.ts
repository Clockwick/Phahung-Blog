/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { fetchSession, fetchLogout } from '../actions/userActions';

import type { UserState } from '../types';

const initialState: UserState = {
  user: undefined,
  isLoggedIn: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchSession.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    })
    .addCase(fetchSession.rejected, (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    })
    .addCase(fetchLogout.fulfilled, (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    });
});

export default userReducer;

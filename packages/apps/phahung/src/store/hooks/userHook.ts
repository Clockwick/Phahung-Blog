import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSession, fetchLogout } from '../actions/userActions';

import type { RootState, AppDispatch } from '..';
import type { User } from '../types';

export const useUser = (): {
  user?: User;
  isLoggedIn: boolean;
  fetchSessionHandler: () => void;
  logoutHandler: () => void;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const fetchSessionHandler = useCallback(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  const logoutHandler = useCallback(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  return { user, isLoggedIn, fetchSessionHandler, logoutHandler };
};

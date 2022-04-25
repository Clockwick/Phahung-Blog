/* eslint-disable import/no-unresolved */
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSession, fetchLogout } from 'store/actions/userActions';

import type { RootState, AppDispatch } from 'store/.';
import type { User } from 'store/types';
import { useHistory } from 'react-router-dom';

export const useUser = (): {
  user?: User;
  isLoggedIn: boolean;
  fetchSessionHandler: () => void;
  logoutHandler: () => void;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { user, isLoggedIn } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const fetchSessionHandler = useCallback(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  const logoutHandler = useCallback(() => {
    dispatch(fetchLogout());
    history.push('/login');
  }, [dispatch, history]);

  return { user, isLoggedIn, fetchSessionHandler, logoutHandler };
};

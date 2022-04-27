/* eslint-disable import/extensions */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useUser } from 'store/hooks/userHook';

import type { RouteProps } from 'react-router-dom';

const Forbidden = React.lazy(() => import('pages/Forbidden'));

interface Props extends RouteProps {
  acceptRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ acceptRoles, ...routeProps }) => {
  const { user, isLoggedIn } = useUser();
  const canAccess = user && acceptRoles.includes(user.role.toString());
  return (
    <>
      {!isLoggedIn && <Redirect to="/signin" />}
      {isLoggedIn && canAccess ? (
        <Route {...routeProps} /> // eslint-disable-line
      ) : (
        <Route component={Forbidden} />
      )}
    </>
  );
};

export default ProtectedRoute;

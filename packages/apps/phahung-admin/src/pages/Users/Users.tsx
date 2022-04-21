/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute, Menu } from 'components/.';

import { ACCEPT_ROLES } from 'config/.';

const ListUser = React.lazy(() => import('./ListUser'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const Users: React.FC = () => {
  return (
    <Menu>
      <React.Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/users"
            component={ListUser}
            acceptRoles={ACCEPT_ROLES.users}
          />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </Menu>
  );
};

export default Users;

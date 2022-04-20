import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute, Menu } from 'components/.';

import { ACCEPT_ROLES } from 'config/.';

const ListAdmin = React.lazy(() => import('./ListAdmin'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const Admins: React.FC = () => {
  return (
    <Menu>
      <React.Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/admins"
            component={ListAdmin}
            acceptRoles={ACCEPT_ROLES.users}
          />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </Menu>
  );
};

export default Admins;

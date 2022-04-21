/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { ProtectedRoute, Menu } from 'components/.';
import { ACCEPT_ROLES } from 'config/.';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import EditAnnouncement from './EditAnnouncement';

const NewAnnouncement = React.lazy(() => import('./NewAnnouncement'));
const ListAnnouncements = React.lazy(() => import('./ListAnnouncements'));

const Announcements: React.FC = () => {
  return (
    <Menu>
      <React.Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/announcements/"
            component={ListAnnouncements}
            acceptRoles={ACCEPT_ROLES.announcements}
          />
          <ProtectedRoute
            exact
            path="/announcements/new"
            component={NewAnnouncement}
            acceptRoles={ACCEPT_ROLES.announcements}
          />
          <ProtectedRoute
            exact
            path="/announcements/edit/:announcementId"
            component={EditAnnouncement}
            acceptRoles={ACCEPT_ROLES.announcements}
          />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </Menu>
  );
};
export default Announcements;

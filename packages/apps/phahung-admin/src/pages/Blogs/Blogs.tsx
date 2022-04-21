/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ProtectedRoute, Menu } from 'components/.';

import { ACCEPT_ROLES } from 'config/.';

const ListBlog = React.lazy(() => import('./ListBlog'));
const NewBlog = React.lazy(() => import('./NewBlog'));
const EditBlog = React.lazy(() => import('./EditBlog'));
const NotFound = React.lazy(() => import('pages/NotFound'));
const PreviewBlog = React.lazy(() => import('pages/Blogs/PreviewBlog'));

const Blogs: React.FC = () => {
  return (
    <Menu>
      <React.Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/blogs"
            component={ListBlog}
            acceptRoles={ACCEPT_ROLES.blogs}
          />
          <ProtectedRoute
            exact
            path="/blogs/new"
            component={NewBlog}
            acceptRoles={ACCEPT_ROLES.blogs}
          />
          <ProtectedRoute
            exact
            path="/blogs/preview"
            component={PreviewBlog}
            acceptRoles={ACCEPT_ROLES.blogs}
          />
          <ProtectedRoute
            path="/blogs/edit/:blogId"
            component={EditBlog}
            acceptRoles={ACCEPT_ROLES.blogs}
          />

          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </Menu>
  );
};

export default Blogs;

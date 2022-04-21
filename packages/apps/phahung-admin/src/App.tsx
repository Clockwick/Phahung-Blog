import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from 'components/.';

import { ACCEPT_ROLES } from 'config/.';
import Announcements from 'pages/Announcements/Announcements';
import Admins from 'pages/Admins';
import Signup from 'pages/Signup';

const Home = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/Login'));
const Blogs = React.lazy(() => import('pages/Blogs'));
const Setting = React.lazy(() => import('pages/Setting'));
const Users = React.lazy(() => import('pages/Users'));
const PreviewBlog = React.lazy(() => import('pages/Blogs/PreviewBlog'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<></>}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            acceptRoles={ACCEPT_ROLES.home}
          />
          <ProtectedRoute
            path="/blogs"
            component={Blogs}
            acceptRoles={ACCEPT_ROLES.blogs}
          />
          <ProtectedRoute
            path="/admins"
            component={Admins}
            acceptRoles={ACCEPT_ROLES.users}
          />
          <ProtectedRoute
            path="/users"
            component={Users}
            acceptRoles={ACCEPT_ROLES.users}
          />
          <ProtectedRoute
            path="/announcements"
            component={Announcements}
            acceptRoles={ACCEPT_ROLES.users}
          />
          <ProtectedRoute
            path="/setting"
            component={Setting}
            acceptRoles={ACCEPT_ROLES.setting}
          />
          <ProtectedRoute
            path="/preview/:blogId"
            component={PreviewBlog}
            acceptRoles={ACCEPT_ROLES.blogs}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Signup} />

          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;

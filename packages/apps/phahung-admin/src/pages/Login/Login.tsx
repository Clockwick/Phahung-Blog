import React from 'react';
import { Switch, Route } from 'react-router-dom';

const LoginForm = React.lazy(() => import('./LoginForm'));
const NotFound = React.lazy(() => import('pages/NotFound'));

const Login: React.FC = () => {
  return (
    <React.Suspense fallback={<></>}>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route component={NotFound} />
      </Switch>
    </React.Suspense>
  );
};

export default Login;

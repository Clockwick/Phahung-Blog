/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Blog from 'pages/Blog';
import Blogs from 'pages/Blogs';
import NotFound from 'pages/NotFound';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Profile from 'pages/Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import { ScrollToTop } from './ScrollToTop';
import { SearchProvider } from './contexts/SearchContext';
import ProtectedRoute from 'components/ProtectedRoute';
import ListAnnouncement from 'pages/ListAnnouncement';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <React.Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/blog/:id" component={Blog} />
            <Route exact path="/" component={Blogs} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <ProtectedRoute
              exact
              path="/announcement"
              component={ListAnnouncement}
              acceptRoles={1}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Suspense>
      </Router>
    </SearchProvider>
  );
};

export default App;

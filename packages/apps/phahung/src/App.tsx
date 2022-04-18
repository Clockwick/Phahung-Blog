/* eslint-disable import/no-unresolved */
import React from 'react';
import Blog from 'pages/Blog';
import Blogs from 'pages/Blogs';
import NotFound from 'pages/NotFound';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Profile from 'pages/Profile';
import Annoucement from 'pages/Announcement';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <React.Suspense fallback={<></>}>
      <Switch>
        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="/" component={Blogs} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/annoucement" component={Annoucement} />
        <Route path="*" component={NotFound} />
      </Switch>
    </React.Suspense>
  </Router>
);

export default App;

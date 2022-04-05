import React from 'react';
import Navbar from 'components/Navbar';
import NotFound from 'pages/NotFound';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';

const Blog = React.lazy(() => import('pages/Blog'));
const Feed = React.lazy(() => import('pages/Feed'));
const Tag = React.lazy(() => import('pages/Tag'));

const App: React.FC = () => (
  <SearchProvider>
    <Router>
      <Navbar />
      <React.Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/blog/:id" component={Blog} />
          <Route exact path="/" component={Feed} />
          <Route exact path="/tag/:name" component={Tag} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Suspense>
    </Router>
  </SearchProvider>
);

export default App;

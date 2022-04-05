import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.css';
import App from './App';
import { HelmetProvider } from './contexts/HelmetContext';
import HelmetLayout from './Layout/HelmetLayout';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <HelmetLayout>
        <App />
      </HelmetLayout>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

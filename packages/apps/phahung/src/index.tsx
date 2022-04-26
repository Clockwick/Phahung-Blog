import { ThemeProvider, createTheme, Box } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import store from './store';
import './styles/index.css';

const persistor = persistStore(store);
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Box sx={{ backgroundColor: '#FFF7F2' }}>
          <App />
        </Box>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

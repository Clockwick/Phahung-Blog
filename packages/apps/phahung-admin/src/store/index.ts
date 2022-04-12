import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({ user: userReducer });

const persistedReducer = persistReducer(
  { key: 'phahung-admin', storage },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

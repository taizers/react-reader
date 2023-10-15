import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/AuthService';
// import CoinModalReducer from './reducers/CoinModalSlice';
import AuthReducer from './reducers/AuthSlice';
import { usersApi } from '../services/UsersService';
import { flibustaApi } from '../services/FlibustaService';
import { apiSlice } from './api/apiSlice';

const RootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [flibustaApi.reducerPath]: flibustaApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  // coinModal: CoinModalReducer,
  auth: AuthReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware, flibustaApi.middleware, apiSlice.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

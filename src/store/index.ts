import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authApi } from '../services/AuthService';
// import CoinModalReducer from './reducers/CoinModalSlice';
// import PortfolioReducer from './reducers/PortfolioSlice';
import { usersApi } from '../services/UsersService';
import { flibustaApi } from '../services/FlibustaService';

const RootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [flibustaApi.reducerPath]: flibustaApi.reducer,
  // coinModal: CoinModalReducer,
  // portfolio: PortfolioReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, usersApi.middleware, flibustaApi.middleware),
  });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

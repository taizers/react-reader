import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import CoinModalReducer from './reducers/CoinModalSlice';
import AuthReducer from './reducers/AuthSlice';
import { apiSlice } from './api/apiSlice';

const RootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // coinModal: CoinModalReducer,
  auth: AuthReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

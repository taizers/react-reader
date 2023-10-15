import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IPortfolioState = {
  user: {
    id: string;
    email: string;
    role: string | null;
    name: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  } | null;
  token: string | null;
};

const initialState: IPortfolioState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserToken, setUserData, logOut } = authSlice.actions;

export default authSlice.reducer;

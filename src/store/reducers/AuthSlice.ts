import { createSlice } from '@reduxjs/toolkit';

type IPortfolioState = {
  user: {
    id: string;
    role: string | null;
    name: string | null;
  } | null;
};

const initialState: IPortfolioState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    localLogout: (state) => {
      state.user = null;
    },
  },
});

export const { setUserData, localLogout } = authSlice.actions;

export default authSlice.reducer;

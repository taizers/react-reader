import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseUrl } from '../constants';
import { IAuthDataResponce, ILoginData, ISignUpData } from '../models/IAuth';

export const authApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    logout: build.mutation<{ data: 'ok' }, string>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    login: build.mutation<IAuthDataResponce, ILoginData>({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data
      }), 
    }),
    signUp: build.mutation<IAuthDataResponce, ISignUpData>({
      query: (data) => ({
        url: '/sign-up',
        method: 'POST',
        body: data
      }),
    }),
    checkAuth: build.mutation<{ data: 'ok' }, string>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
        credentials: "include"
      }),
    }),
  }),
});

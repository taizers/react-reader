import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: '/sign-up',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: '/profile',
      }),
      providesTags: ['User'],
    }),
  }),
});

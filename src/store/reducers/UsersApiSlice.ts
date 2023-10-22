import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['User'],
    }),
    getUsers: builder.query({
      query: ({ page, limit }) => ({
        url: `/users?page=${page}&limit=${limit}`,
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { ...user },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

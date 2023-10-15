import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseLimit, baseOffset, baseUrl } from '../constants';
import { IUser, IUserUpdatingData } from '../models/IUser';

export const usersApi = createApi({
  reducerPath: 'UsersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchUsers: build.query<
      { data: IUser[] },
      { limit: number; offset: number; search?: string }
    >({
      query: ({ limit = baseLimit, offset = baseOffset, search }) => {
        if (search) {
          return {
            url: '/users',
            params: {
              limit,
              offset,
              search
            },
          }
        }

        return {
          url: '/users',
          params: {
            limit,
            offset,
          },
        }
      },
    }),
    fetchUser: build.query<{ data: IUser }, string>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    fetchProfile: build.query<{ data: IUser }, string>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    deleteUser: build.mutation<{ data: 'ok' }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
    }),
    updateUser: build.mutation<{ data: IUser }, IUserUpdatingData>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user
      }),
    }),
  }),
});

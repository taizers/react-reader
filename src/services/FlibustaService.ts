import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseUrl } from '../constants';
import { IFlibustaBook } from '../models/IBook';

export const flibustaApi = createApi({
  reducerPath: 'FlibustaApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchBooks: build.query<
      { data: IFlibustaBook[] },
      { limit: number; offset: number; query?: string }
    >({
      query: ({ limit = 5, offset = 0, query }) => {
        if (query) {
          return {
            url: '/search',
            params: {
              limit,
              offset,
              query
            },
          }
        }

        return {
          url: '/search',
          params: {
            limit,
            offset,
          },
        }
      },
    }),
  }),
});

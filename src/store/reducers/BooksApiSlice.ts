import { apiSlice } from '../api/apiSlice';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ['Book'],
    }),
    getBooks: builder.query({
      query: ({ page, limit }) => ({
        url: `/books?page=${page}&limit=${limit}`,
      }),
      providesTags: ['Book'],
    }),
    getUserBooks: builder.query({
      query: ({ page, limit, id }) => ({
        url: `/books/user/${id}?page=${page}&limit=${limit}`,
      }),
     }),
    updatBook: builder.mutation({
      query: ({ id, user }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: { ...user },
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

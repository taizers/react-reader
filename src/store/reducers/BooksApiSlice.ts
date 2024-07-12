import { apiSlice } from '../api/apiSlice';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (book) => ({
        url: `/books`,
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
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
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: { ...book },
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

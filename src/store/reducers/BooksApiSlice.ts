import { apiSlice } from '../api/apiSlice';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (book) => ({
        url: `/books`,
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book','Seria'],
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ['Book'],
    }),
    getBooksText: builder.query({
      query: (id) => ({
        url: `/books/${id}/text`,
      }),
      providesTags: ['Book'],
    }),
    getBooks: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/books?query=${query}&page=${page}&limit=${limit}`,
      }),
      providesTags: ['Book'],
    }),
    getUserBooks: builder.query({
      query: ({ page, limit, id }) => ({
        url: `/books/user/${id}?page=${page}&limit=${limit}`,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: { ...book },
      }),
      invalidatesTags: ['Book','Seria'],
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

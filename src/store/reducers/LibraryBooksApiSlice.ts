import { apiSlice } from '../api/apiSlice';

export const libraryBooksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLibraryBook: builder.mutation({
      query: (book) => ({
        url: `/library`,
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Library'],
    }),
    getLibraryBook: builder.query({
      query: (id) => ({
        url: `/library/${id}`,
      }),
      providesTags: ['Library'],
    }),
    getLibraryBooks: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/library?query=${query}&page=${page}&limit=${limit}`,
      }),
      providesTags: ['Library'],
    }),
    getUserLibraryBooks: builder.query({
      query: ({ page, limit, id, query }) => ({
        url: `/library/user/${id}?page=${page}&limit=${limit}&query=${query}&state=${null}`,
      }),
    }),
    updateLibraryBook: builder.mutation({
      query: (data) => ({
        url: `/library`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: ['Book'],
    }),
    deleteLibraryBook: builder.mutation({
      query: (id) => ({
        url: `/library/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Library'],
    }),
  }),
});

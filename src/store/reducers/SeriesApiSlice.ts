import { apiSlice } from '../api/apiSlice';

export const seriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSeria: builder.mutation({
      query: (book) => ({
        url: `/series`,
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Seria'],
    }),
    getSeria: builder.query({
      query: (id) => ({
        url: `/series/${id}`,
      }),
      providesTags: ['Seria'],
    }),
    getSeries: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/series?query=${query}&page=${page}&limit=${limit}`,
      }),
      providesTags: ['Seria'],
    }),
    getSeriesList: builder.query({
      query: (query) => ({
        url: `/series/list?query=${query}`,
      }),
      providesTags: ['Seria'],
    }),
    updateSeria: builder.mutation({
      query: ({ id, book }) => ({
        url: `/series/${id}`,
        method: 'PUT',
        body: { ...book },
      }),
      invalidatesTags: ['Seria'],
    }),
    deleteSeria: builder.mutation({
      query: (id) => ({
        url: `/series/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Seria', 'Book'],
    }),
  }),
});

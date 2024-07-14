import { apiSlice } from '../api/apiSlice';

export const genresApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (genre) => ({
        url: `/genres`,
        method: 'POST',
        body: genre,
      }),
      invalidatesTags: ['Genre'],
    }),
    getGenresByQuery: builder.query({
      query: (query) => ({
        url: `/genres?query=${query}`,
      }),
      providesTags: ['Genre'],
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `/genres/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Genre'],
    }),
  }),
});

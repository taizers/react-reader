import { apiSlice } from '../api/apiSlice';

export const tagsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation({
      query: (tag) => ({
        url: `/tags`,
        method: 'POST',
        body: tag,
      }),
      invalidatesTags: ['Tag'],
    }),
    getTagsByQuery: builder.query({
      query: (query) => ({
        url: `/tags?query=${query}`,
      }),
      providesTags: ['Tag'],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

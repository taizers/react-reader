import { apiSlice } from '../api/apiSlice';

export const remoteBooksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/search?query=${query}&page=${page}&limit=${limit}`,
      }),
    }),
  }),
});

// export const getAuthorsApi = async (data: GetAuthors) => {
//     const { query, limit = 10, page = 0 } = data;

//     return http.get<GetBooksByResponse>(`books/authors?query=${query}&page=${page}&limit=${limit}`);
// }

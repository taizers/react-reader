import http from '../../http';

type GetBooksByName = {
    query: string;
    limit?: number;
    page?: number;
}

type GetAuthors = {
    query: string;
    type:string;
    limit?: number;
    page?: number;
}

type GetBooksByResponse = any;

export const getBooksApi = async (data: GetBooksByName) => {
    const { query, limit = 10, page = 0 } = data;

    return http.get<GetBooksByResponse>(`books/search?query=${query}&page=${page}&limit=${limit}`);
}

// export const getAuthorsApi = async (data: GetAuthors) => {
//     const { query, limit = 10, page = 0 } = data;

//     return http.get<GetBooksByResponse>(`books/authors?query=${query}&page=${page}&limit=${limit}`);
// }

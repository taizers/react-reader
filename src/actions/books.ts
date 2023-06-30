import {
    GET_BOOKS,
    SET_BOOKS_LOADING,
    GET_BOOKS_SUCCESSED,
} from '../constants/types';
import { BooksResponceType } from '../constants/tsSchemes';

export const setBooksLoading = (bool: boolean) => ({
    type: SET_BOOKS_LOADING,
    payload: bool,
});

export const getBooks = (query: string, page?: number, limit?: number) => ({
    type: GET_BOOKS,
    payload: {query, page, limit}
});

// export const getAuthors = (query: string, page?: number, limit?: number) => ({
//     type: GET_AUTHORS,
//     payload: {query, page, limit}
// });

export const getBooksSuccessed = (books: BooksResponceType) => ({
    type: GET_BOOKS_SUCCESSED,
    payload: books,
});

// export const getAuthorsSuccessed = (authors: BooksResponceType) => ({
//     type: GET_AUTHORS_SUCCESSED,
//     payload: authors,
// });


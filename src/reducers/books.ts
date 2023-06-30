import {
  GET_BOOKS_SUCCESSED,
  SET_BOOKS_LOADING,
  GET_AUTHORS_SUCCESSED,
} from '../constants/types';

const initialState = {
  books: {},
  book: {},
  authors: {},
  isLoading: false,
};

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS_SUCCESSED:
        return {
            ...state,
            books: payload,
        };
    case GET_AUTHORS_SUCCESSED:
        return {
            ...state,
            authors: payload,
        };
    case SET_BOOKS_LOADING:
        return {
            ...state,
            isLoading: payload,
        };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

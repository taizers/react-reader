import {
    GET_ALL_USERS_SUCCESSED,
    GET_USER_SUCCESSED,
    SET_USERS_LOADING,
    UPDATE_USER_SUCCESSED,
} from '../constants/types';

const initialState = {
  user: {},
  users: [],
  isLoading: false,
};

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS_LOADING:
        return {
            ...state,
            isLoading: payload,
        };
    case GET_ALL_USERS_SUCCESSED:
        return {
            ...state,
            users: payload,
        };
    case GET_USER_SUCCESSED:
        return {
            ...state,
            user: payload,
        };
    case UPDATE_USER_SUCCESSED:
        return {
            ...state,
            user: payload,
        };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

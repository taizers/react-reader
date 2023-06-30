import {
    LOGIN_SUCCESSED,
    SET_AUTH_LOADING,
} from '../constants/types';

const initialState = {
  authUser: {},
  isLoading: false,
  isAuth: false,
};

const reducer = (state = initialState, action: {type: string; payload: any}) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESSED:
        return {
            ...state,
            authUser: payload,
            isAuth: true,
        };
    case SET_AUTH_LOADING:
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

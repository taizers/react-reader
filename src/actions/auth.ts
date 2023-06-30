import {
    LOGIN,
    LOGIN_SUCCESSED,
    LOGIN_FAILED,
    LOGOUT,
    SIGNUP,
    SIGNUP_SUCCESSED,
    SIGNUP_FAILED,
    SET_AUTH_LOADING,
    CHECK_AUTH,
} from '../constants/types';
import { SignUpUserType, LoginUserType, UserType } from '../constants/tsSchemes';


export const login = (data: { data: LoginUserType; history: any }) => ({
    type: LOGIN,
    payload: data,
});

export const loginSuccessed = (user: UserType) => ({
    type: LOGIN_SUCCESSED,
    payload: user,
});

export const setAuthLoading = (bool: boolean) => ({
    type: SET_AUTH_LOADING,
    payload: bool,
});

export const loginFailed = () => ({
    type: LOGIN_FAILED,
});

export const signUp = (data: { data: SignUpUserType; history: any }) => ({
    type: SIGNUP,
    payload: data,
});

export const signUpSuccessed = () => ({
    type: SIGNUP_SUCCESSED,
});

export const signUpFailed = () => ({
    type: SIGNUP_FAILED,
});

export const logout = (history: any) => ({
    type: LOGOUT,
    payload: {history}
});
export const checkAuth = (history: any) => ({
    type: CHECK_AUTH,
    payload: {history}
});


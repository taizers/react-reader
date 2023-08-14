import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { auth as authApi } from '../api/index';
import { auth as authAction } from '../actions/index';
import {
    CHECK_AUTH,
    LOGIN,
    SIGNUP,
    LOGOUT,
} from "../constants/types";

import { setToken, clearToken } from '../utils/index';
import { createToast } from '../utils/toasts';

function* login({ payload: { data, history } }) {
    yield put(authAction.setAuthLoading(true));
    try {
        const { data: { user, user_session } } = yield call(authApi.login, data);
        yield setToken(user_session.access_token);
        yield put(authAction.loginSuccessed(user));
        yield history('/');
    } catch (error) {
        yield createToast.error(error.response?.data?.message);
    } finally {
        yield put(authAction.setAuthLoading(false));
    }
}

function* signUpUser({ payload: { data, history } }) {
    yield put(authAction.setAuthLoading(true));
    try {
        yield call(authApi.signUp, data);
        yield history('/login');
    } catch (error) {
        yield createToast.error(error.response?.data?.message);
    } finally {
        yield put(authAction.setAuthLoading(false));
    }
}

function* checkAuth({ payload: { history } }) {
    try {
        const { data: { user, user_session } } = yield call(authApi.checkAuth);

        yield setToken(user_session.access_token);
        yield put(authAction.loginSuccessed(user));
    } catch (error) {
        yield createToast.error(error.response?.data?.message);
    }
}

function* logout({ payload: { history } }) {
    try {
        yield call(authApi.logout);

        yield clearToken();
        yield history('/');
    } catch (error) {
        yield createToast.error(error.response?.data?.message);
    }
}

function* watchLogin() {
    yield takeEvery(LOGIN, login);
}

function* watchSignUp() {
    yield takeEvery(SIGNUP, signUpUser);
}

function* watchCheckAuth() {
    yield takeEvery(CHECK_AUTH, checkAuth);
}

function* watchLogout() {
    yield takeEvery(LOGOUT, logout);
}

export default function* rootSaga() {
    yield all([
      fork(watchLogin),
      fork(watchSignUp),
      fork(watchCheckAuth),
      fork(watchLogout),
    ]);
}

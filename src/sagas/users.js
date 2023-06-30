import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { users as usersApi } from '../api/index';
import { users as usersAction, auth as authAction } from '../actions/index';
import { setToken } from '../utils/index';
import {
    DELETE_USER,
    GET_ALL_USERS,
    GET_USER,
    UPDATE_USER,
} from "../constants/types";
import { createToast } from '../utils/toasts';

function* getAllUsers() {
    yield put(usersAction.setUsersLoading(true));
    try {
        const { data } = yield call(usersApi.getAllUsers);
        yield console.log(data);
        yield put(usersAction.getAllUsersSuccessed(data));
    } catch (error) {
        yield createToast.error(error.response.data.message);
    } finally {
        yield put(usersAction.setUsersLoading(false));
    }
}

function* getUser({ payload }) {
    yield put(usersAction.setUsersLoading(true));
    try {
        const { data } = yield call(usersApi.getUser, payload);
        yield put(usersAction.getUserSuccessed(data));
    } catch (error) {
        yield createToast.error(error.response.data.message);
    } finally {
        yield put(usersAction.setUsersLoading(false));
    }
}

function* updateUser({ payload }) {
    yield put(usersAction.setUsersLoading(true));
    try {
        const { data: { user, accessToken } } = yield call(usersApi.updateUser, payload);
        yield setToken(accessToken);
        yield put(authAction.loginSuccessed(user));
    } catch (error) {
        yield createToast.error(error.response.data.message);
    } finally {
        yield put(usersAction.setUsersLoading(false));
    }
}

function* deleteUser({ payload }) {
    yield put(usersAction.setUsersLoading(true));
    try {
        const responce = yield call(usersApi.deleteUser, payload);
        yield put(usersAction.deleteUserSuccessed(responce.status));
        yield put(usersAction.getAllUsers());
    } catch (error) {
        yield createToast.error(error.response.data.message);
    } finally {
        yield put(usersAction.setUsersLoading(false));
    }
}

function* watchGetAllUsers() {
    yield takeEvery(GET_ALL_USERS, getAllUsers);
}

function* watchGetUser() {
    yield takeEvery(GET_USER, getUser);
}

function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, updateUser);
}

function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, deleteUser);
}

export default function* rootSaga() {
    yield all([
      fork(watchGetAllUsers),
      fork(watchGetUser),
      fork(watchUpdateUser),
      fork(watchDeleteUser),
    ]);
}

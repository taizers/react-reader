import { all } from 'redux-saga/effects';

import authSaga from './auth';
import usersSaga from './users';
import booksSaga from './books';

export default function* rootSaga() {
    yield all([
        authSaga(),
        usersSaga(),
        booksSaga(),
    ]);
}
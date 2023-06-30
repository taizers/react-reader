import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { books as booksAction } from '../actions/index';
import {
    GET_BOOKS,
} from "../constants/types";
import { createToast } from '../utils/toasts';
import { getBooksApi } from '../api/flibusta/flibustaApi';

function* getBooks({ payload }) {
    yield put(booksAction.setBooksLoading(true));
    try {
        const {data} = yield call(getBooksApi, payload);
        
        yield put(booksAction.getBooksSuccessed(data));
    } catch (error) {
        yield createToast.error(error.message);
    } finally {
        yield put(booksAction.setBooksLoading(false));
    }
}

// function* getAuthors({ payload }) {
//     yield put(booksAction.setBooksLoading(true));
//     try {
//         const {data} = yield call(getAuthorsApi, payload);
        
//         yield put(booksAction.getAuthorsSuccessed(data));
//     } catch (error) {
//         yield createToast.error(error.message);
//     } finally {
//         yield put(booksAction.setBooksLoading(false));
//     }
// }

function* watchGetBooks() {
    yield takeEvery(GET_BOOKS, getBooks);
}

// function* watchGetAuthors() {
//     yield takeEvery(GET_AUTHORS, getAuthors);
// }


export default function* rootSaga() {
    yield all([
      fork(watchGetBooks),
    //   fork(watchGetAuthors),
    ]);
}

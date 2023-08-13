import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { createBrowserHistory } from 'history';

import { LOGOUT } from '../constants/types';
import auth from './auth';
import users from './users';
import books from './books';
import { clearToken } from '../utils';

const history = createBrowserHistory();

const appReducer = combineReducers({
  auth,
  users,
  books,
  // eslint-disable-next-line no-restricted-globals
  router: createRouterReducer(history),
});

const rootReducer = (state: any, action: {type: string, action: any}) => {
  if (action.type === LOGOUT) {
    state = undefined;
    clearToken();
  }
  return appReducer(state, action);
};

export { rootReducer };
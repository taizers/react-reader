import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from '../reducers/index';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools({
  traceLimit: 20,
  trace: true,
});

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default createAppStore;

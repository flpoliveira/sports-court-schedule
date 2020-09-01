import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { history } from '../routes';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
}

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const composer = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

// mount it on the Store
const store = createStore(
  connectRouter(history)(persistedReducer),
  composer
);

// then run the saga
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };

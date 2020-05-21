import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
console.log(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__, 'zz');
const loggerMiddleware = createLogger();
const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(thunk, loggerMiddleware)) : composeEnhancers(applyMiddleware(thunk)),
);
export default store;

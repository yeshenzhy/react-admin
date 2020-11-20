import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from './router';
import './assets/css/common.scss';
import './assets/css/app.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, 
  document.getElementById('root'),
);

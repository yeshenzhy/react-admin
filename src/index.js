import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import Router from './router';
import './assets/css/common.scss';
import './assets/css/app.scss';
import store from './store/index';

ReactDOM.render(
  <Provider {...store}>
    <Router />
  </Provider>, 
  document.getElementById('root'),
);
configure({ enforceActions: 'observed' });

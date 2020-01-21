import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import './assets/css/common.scss';
import './assets/css/app.scss';
import store from './redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

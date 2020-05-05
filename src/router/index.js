import React from 'react';
import {
  HashRouter, Route, Switch, 
} from 'react-router-dom';
import Layout from '@src/pages/Layout/index';
import Login from '@src/pages/Login';

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/login" />
          <Route path="/" component={Layout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;

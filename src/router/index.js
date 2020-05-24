import React from 'react';
import {
  HashRouter, Route, Switch, 
} from 'react-router-dom';
import Layout from '@src/pages/Layout/Index';
import Login from '@src/pages/Login/Login';
import AuthRouter from '@src/pages/Auth/AuthRouter';

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/login" />
          <AuthRouter path="/" component={Layout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;

import React from 'react';
import {
  HashRouter, Route, Switch, 
} from 'react-router-dom';
import MainComponents from './main';

class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={MainComponents} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;

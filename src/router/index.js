import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainComponents from './main';

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={MainComponents} />
    </Switch>
  </HashRouter>
);

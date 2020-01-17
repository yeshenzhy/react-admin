import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import MainComponents from './main';
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={MainComponents} />
    </Switch>
  </BrowserRouter>
);

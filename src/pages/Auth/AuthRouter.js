import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const AuthRouter = ({ component: Component, ...rest }) => {
  const isLogged = localStorage.getItem('isLogin') === '1';
  return <Route {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default withRouter(AuthRouter);

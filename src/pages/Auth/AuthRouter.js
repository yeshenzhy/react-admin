import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

@withRouter
class AuthRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLogged = localStorage.getItem('userInfo');
    const { rest, component: Component } = this.props;
    return <Route exact {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to="/login" />)} />;
  }
}

export default AuthRouter;


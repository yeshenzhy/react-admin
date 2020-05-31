import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

// const AuthRouter = ({ component: Component, ...rest }) => {
//   const isLogged = localStorage.getItem('isLogin') === '1';
//   return <Route {...rest} render={props => { return (isLogged ? <Component {...props} /> : <Redirect to="/login" />); }} />;
// };

// export default withRouter(AuthRouter);
@withRouter
class AuthRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLogged = localStorage.getItem('userInfo');
    const { rest, component: Component } = this.props;
    return <Route exact {...rest} render={props => { return (isLogged ? <Component {...props} /> : <Redirect to="/login" />); }} />;
  }
}

export default AuthRouter;


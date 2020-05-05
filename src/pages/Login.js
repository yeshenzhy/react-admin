import React from 'react';
import { Button } from 'antd';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    localStorage.setItem('isLogin', '1');
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.login}>点我登录</Button>
        <a href="#/">去首页</a>
      </div>
    );
  }
}

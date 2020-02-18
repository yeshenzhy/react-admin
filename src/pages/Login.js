import React from 'react';
import { Button } from 'antd';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary">我是登录页面</Button>
        <a href="#/">去首页</a>
      </div>
    );
  }
}

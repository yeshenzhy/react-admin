import React from 'react';
import { Button } from 'antd';
import imgURL from '@src/assets/static/logo512.png';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary</Button>
        <a href="#/my">去我的页</a>
        <img src={imgURL} alt="" />
      </div>
    );
  }
}

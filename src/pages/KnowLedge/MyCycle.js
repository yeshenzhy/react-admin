import React from 'react';
import { Button } from 'antd';

export default class MyCycle extends React.Component {
  render() {
    return (
      <div className="box2">
        <Button type="primary">my</Button>
        <a href="#/detail">myCycle</a>
        <p className="p">我是p标签</p>
      </div>
    );
  }
}

import React from 'react';
import { Button } from 'antd';

export default class ChildChild extends React.Component {
  render() {
    return (
      <div className="box2">
        <Button type="primary">ChildChild</Button>
        <a href="#/detail">ChildChild</a>
        <p className="p">我是p标签</p>
      </div>
    );
  }
}

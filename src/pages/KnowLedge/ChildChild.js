import React from 'react';
import { Button } from 'antd';

export default class ChildChild extends React.Component {
  render() {
    return (
      <div className="box2">
        <Button type="primary">去详情aaaaaaaa</Button>
        <a href="#/knowLedge/syntax/detail">去详情</a>
        <p className="p">我是pzz标签</p>
      </div>
    );
  }
}

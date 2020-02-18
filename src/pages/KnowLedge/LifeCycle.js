import React from 'react';
import { Button } from 'antd';
import './life.scss';

export default class LifeCycle extends React.Component {
  render() {
    return (
      <div className="box">
        <Button type="primary">LifeCycle</Button>
        <a href="#/detail">常用语法/LifeCycle</a>
        <p className="p">我是p标签</p>
      </div>
    );
  }
}

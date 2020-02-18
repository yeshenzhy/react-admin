import React from 'react';
import { Button } from 'antd';

export default class Childpage extends React.Component {
  render() {
    return (
      <div className="box2">
        <Button type="primary">child</Button>
        <a href="#/detail">child</a>
        <p className="p">我是p标签</p>
      </div>
    );
  }
}

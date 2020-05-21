import React from 'react';
import { Button } from 'antd';

export default class Know extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary">{this.props.children}</Button>
      </div>
    );
  }
}

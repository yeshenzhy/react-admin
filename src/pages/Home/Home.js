import React from 'react';
import { Button } from 'antd';

import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';

@withRouter 
class Home extends React.Component {
  componentDidMount() {
  }
  goNext() {
    this.props.history.push({ pathname: '/knowLedge/syntax' });
  }
  render() {
    const obj = urlParams(this.props.location.search);
    console.log(obj);
    return (
      <div>
        <Button type="primary">Primary</Button>
        <img src={require('@src/assets/static/logo512.png').default} alt="" />
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { Button } from 'antd';

import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';
import { loginApi } from '@src/api/homeApi';

@withRouter 
class Home extends React.Component {
  componentDidMount() {
    console.log('zxxccczz');
    loginApi()
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
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

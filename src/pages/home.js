import React from 'react';
import { Button } from 'antd';
// import imgURL from '@src/assets/static/logo512.png';
import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';

@withRouter
class Home extends React.Component {
  render() {
    const obj = urlParams(this.props.location.search);
    console.log(obj);
    return (
      <div>
        <Button type="primary">Primary</Button>
        <a href="#/my">去我的页</a>
        <img src={require('@src/assets/static/logo512.png').default} alt="" />
      </div>
    );
  }
}

export default Home;

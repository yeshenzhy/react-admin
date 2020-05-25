import React from 'react';
import { Button } from 'antd';
import Canvas from './Canvas';
import Swiper from './Swiper';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: '',
    // };
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.login();
    // }, 2000);
  }
  login() {
    localStorage.setItem('isLogin', '1');
    const id = 12; 
    const name = 'tom';
    this.props.history.replace({ pathname: '/home', search: `id=${id}&name=${name}` });
  }
  render() {
    return (
      <div className="pages-login">
        <Swiper />
        {/* <Canvas /> */}
      </div>
    );
  }
}

export default Login;

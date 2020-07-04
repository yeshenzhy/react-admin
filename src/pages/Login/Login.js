import React from 'react';
import {
  Button, Form, Input, Icon, message, Switch,
} from 'antd';
import { loginApi, registerApi } from '@src/api/homeApi';
import Canvas from './Canvas';
import Swiper from './Swiper';
import './Login.scss';

const Register = (props) => {
  return (
    props.isRegister 
      ? (
        <Form onSubmit={props.handleSubmit} className="login-form">
          <Form.Item>
            {props.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入昵称！' }],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入昵称"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {props.getFieldDecorator('mobile', {
              rules: [{ required: true, message: '请输入手机号！' }],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入手机号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {props.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {props.getFieldDecorator('passwordAgain', {
              rules: [{ required: true, message: '请再次输入密码！' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请再次输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button className="btn-login" type="primary" htmlType="submit" block onClick={props.register}>
              注册
            </Button>
          </Form.Item>    
        </Form>

      ) : null
  );
};
const Login = (props) => {
  return (
    !props.isRegister ? (
      <Form onSubmit={props.handleSubmit} className="login-form">
        <Form.Item>
          {props.getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入手机号！' }],
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入手机号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button className="btn-login" type="primary" htmlType="submit" block onClick={props.login}>
            登录
          </Button>
        </Form.Item>    
      </Form>
    ) : null
  );
};
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false,
      isStar: false,
    };
  }
  componentDidMount() {
    this.init();
  }
  // 初始化
  init() {
    this.setState({
      isRegister: false,
    });
    localStorage.removeItem('userInfo');
  }
  // 切换登录/注册
  switchRegister() {
    this.setState({
      isRegister: !this.state.isRegister,
    });
    this.props.form.resetFields();
  }
  // 切换风格
  switchStyle() {
    this.setState({
      isStar: !this.state.isStar,
    });
  }
  // 登录
  login(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginApi({ mobile: values.mobile, password: values.password })
          .then(res => {
            message.success(res.msg, () => {
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              localStorage.setItem('token', JSON.stringify(res.token));
              this.props.history.replace({ pathname: '/home' });
            });
          });
      }
    });
  }
  // 注册
  register(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        registerApi({
          name: values.name, 
          mobile: values.mobile, 
          password: values.password, 
          passwordAgain: values.passwordAgain, 
        })
          .then(res => {
            console.log(res);
            message.success(`${res.msg}快去登录吧`, 2);
            this.switchRegister();
          });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isRegister } = this.state;
    return (
      <div className="pages-login">
        {this.state.isStar ? <Canvas /> : <Swiper />}
        <div className="switch-style">
          <Switch checkedChildren="卡通" unCheckedChildren="星空" defaultChecked onChange={this.switchStyle.bind(this)} />
        </div>
        <div className="form">
          <div className="title">
            <div className="name">夜神丶管理系统</div>
            <div className="register" onClick={this.switchRegister.bind(this)}>
              {this.state.isRegister ? '注册' : '登录'}
              <Icon type="right" />
            </div>
          </div>
          <Login 
            isRegister={isRegister} 
            getFieldDecorator={getFieldDecorator} 
            login={this.login.bind(this)}
          />
          <Register 
            isRegister={isRegister} 
            getFieldDecorator={getFieldDecorator} 
            register={this.register.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(LoginComponent);

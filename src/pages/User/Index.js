import React from 'react';
// import { Button, Form, Input } from 'antd';
import { withRouter } from 'react-router-dom';

const UserCenter = (props) => {
  // const { getFieldDecorator } = props.form;
  console.log(props, this, 'zz');
  return (
    <div>123</div>
    // <Form className="user-center">
    //   <Form.Item label="用户头像"></Form.Item>
    //   <Form.Item label="Password" hasFeedback>
    //     {getFieldDecorator('password', {
    //       rules: [
    //         {
    //           required: true,
    //           message: 'Please input your password!',
    //         },
    //         { validator: this.validateToNextPassword },
    //       ],
    //     })(<Input.Password />)}
    //   </Form.Item>
    //   <Form.Item label="Confirm Password" hasFeedback>
    //     {getFieldDecorator('confirm', {
    //       rules: [
    //         {
    //           required: true,
    //           message: 'Please confirm your password!',
    //         },
    //         { validator: this.compareToFirstPassword },
    //       ],
    //     })(<Input.Password onBlur={this.handleConfirmBlur} />)}
    //   </Form.Item>
    // </Form>
  );
};
// Form.create({ name: 'register' })(UserCenter)
export default withRouter(UserCenter);

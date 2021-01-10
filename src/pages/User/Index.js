import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Icon, Upload, message } from 'antd';
import { withRouter } from 'react-router-dom';
import './index.scss';
import emitter from '@src/utils/bus';

const UploadAvatar = () => {
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const props = {
    name: 'file',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    multiple: false,
    headers: { Authorization: localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '' },
    action: 'http://service.yeshen1.cn/api/v1/upload',
    beforeUpload() {
      props.headers.Authorization = localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '';
    },
    onChange(info) {
      const { status, response } = info.file;
      if (status === 'uploading') {
        setLoading(true);
      }
      if (status === 'done') {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.avatar = response.data.url; 
        emitter.emit('updateUserInfo', userInfo);
        message.success('图片上传成功');
        setLoading(false);
      } else if (status === 'error') {
        message.error('图片上传失败');
        setLoading(false);
      }
    },
  };
  return (
    <div className="avatar-upload">
      <Dragger {...props}>
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">上传头像</div>
        </div>
      </Dragger>
    </div>
  );
};
const UserCenter = (props) => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  const handleConfirmBlur = e => {
    console.log(e);
    // const { value } = e.target;
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  return (
    <Row>
      <Col span={12}>
        <Form {...formItemLayout} className="user-center">
          <Form.Item label="用户头像" extra="点击头像上传图片">
            <UploadAvatar></UploadAvatar>
          </Form.Item>
          <Form.Item label="用户昵称">
            <Input placeholder="请输入用户昵称" />
          </Form.Item>
          <Form.Item label="用户手机号" extra="用户手机号不可修改">
            <Input value="13456545678" disabled />
          </Form.Item>
          <Form.Item label="用户登录密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                { validator: validateToNextPassword },
              ],
            })(<Input.Password placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item label="再次确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                { validator: compareToFirstPassword },
              ],
            })(<Input.Password placeholder="请输入再次确认密码" onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button className="mar-r-10">取消</Button>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
const WrappedForm = Form.create({ name: 'user' })(UserCenter);
export default withRouter(WrappedForm);

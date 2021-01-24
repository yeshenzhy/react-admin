import React, { useState } from 'react';
import { Button, Form, Input, Row, Col, Icon, Upload, message } from 'antd';
import { withRouter } from 'react-router-dom';
import './index.scss';
import emitter from '@src/utils/bus';

const UploadAvatar = () => {
  const [uploadResult, setUploadResult] = useState({ loading: false, imgUrl: '' });
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
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
        setUploadResult((prev) => ({ ...prev, loading: true }));
      }
      if (status === 'done') {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.avatar = response.data.url; 
        emitter.emit('updateUserInfo', userInfo);
        message.success('图片上传成功');
        getBase64(info.file.originFileObj, imgUrl => setUploadResult({ imgUrl, loading: false }));
      } else if (status === 'error') {
        message.error('图片上传失败');
        setUploadResult((prev) => ({ ...prev, loading: false }));
      }
    },
  };
  const uploadButton = (
    <div>
      <Icon type={uploadResult.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传头像</div>
    </div>
  );
  return (
    <div className="avatar-upload">
      <Upload {...props}>
        { uploadResult.imgUrl ? <img alt="avatar" src={uploadResult.imgUrl} style={{ width: '100%', maxHeight: '86px' }} /> : uploadButton }
      </Upload>
    </div>
  );
};

const UserCenter = (props) => {
  const { getFieldDecorator } = props.form;
  const [confirmDirty, setConfirmDirty] = useState(false);
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
  // 自定义密码校验
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  // 自定义再次密码校验
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('再次确认密码和输入密码不一样！');
    } else {
      callback();
    }
  };
  // 提交表单
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      console.log(values, '1111');
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // 表单数去焦点
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty((prev) => prev || !!value);
  };
  // 表单配置项
  const formConfig = () => [
    { 
      itemOptions: { label: '用户头像', extra: '点击头像上传图片' },
      initialValue: '', 
      rules: [],
      name: '',
      children: <UploadAvatar></UploadAvatar>, 
    },
    { 
      itemOptions: { label: '用户昵称', hasFeedback: true },
      initialValue: '夜神', 
      rules: [
        {
          required: true,
          max: 8,
          message: '请输入用户昵称',
        },
      ],
      name: 'nick',
      children: <Input placeholder="请输入用户昵称" />, 
    },
    { 
      itemOptions: { label: '用户手机号', extra: '用户手机号不可修改' },
      initialValue: '18345456789', 
      rules: [],
      name: 'mobile',
      children: <Input disabled />, 
    },
    { 
      itemOptions: { label: '用户登录密码', hasFeedback: true },
      initialValue: '', 
      rules: [
        {
          required: true,
          message: '请输入密码',
        },
        {
          required: true,
          max: 15,
          message: '密码长度为6~15位',
        },
        { validator: validateToNextPassword },
      ],
      name: 'password',
      children: <Input.Password placeholder="请输入密码" />, 
    },
    { 
      itemOptions: { label: '再次确认密码', hasFeedback: true },
      initialValue: '', 
      rules: [
        {
          required: true,
          message: '请输入再次确认密码',
        },
        { validator: compareToFirstPassword },
      ],
      name: 'confirm',
      children: <Input.Password placeholder="请输入再次确认密码" onBlur={handleConfirmBlur} />,
    },
  ];
  return (
    <Row>
      <Col span={12}>
        <Form {...formItemLayout} onSubmit={handleSubmit} className="user-center">
          {formConfig().map(({ itemOptions, children, name, rules, initialValue }, i) => (
            <Form.Item {...itemOptions} key={i}>
              { name ? getFieldDecorator(name, { rules, initialValue })(children) : children}
            </Form.Item>
          ))}
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

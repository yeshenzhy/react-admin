import React from 'react';
import {
  Button, Upload, Icon, message, 
} from 'antd';

import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';
import { testApi } from '@src/api/homeApi';
import emitter from '@src/utils/bus';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  headers: {
    Authorization: localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '',
  },
  action: 'http://service.yeshen1.cn/api/v1/upload',
  showUploadList: false,
  beforeUpload() {
    props.headers.Authorization = localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '';
  },
  onChange(info) {
    const { status, response } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(String(response.data.url), 'zzz');
      const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
      userInfo.avatar = response.data.url; 
      emitter.emit('updateUserInfo', userInfo);
      message.success('图片上传成功');
    } else if (status === 'error') {
      message.error('图片上传失败');
    }
  },
};
class UploadImg extends React.Component {
  render() {
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
        </p>
      </Dragger>
    );
  }
}

@withRouter 
class Home extends React.Component {
  componentDidMount() {
  }
  goNext() {
    this.props.history.push({ pathname: '/knowLedge/syntax' });
  }
  // 测试
  test() {
    testApi({}).then(res => console.log(res));
  }
  render() {
    const obj = urlParams(this.props.location.search);
    console.log(obj);
    return (
      <div>
        <Button type="primary" onClick={this.test}>Primary</Button>
        <UploadImg></UploadImg>
      </div>
    );
  }
}

export default Home;

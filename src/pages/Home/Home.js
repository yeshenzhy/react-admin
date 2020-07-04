import React from 'react';
import {
  Button, Upload, Icon, message, 
} from 'antd';

import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  headers: {
    Authorization: localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '',
  },
  action: 'http://localhost:8888/api/v1/upload',
  beforeUpload() {
    props.headers.Authorization = localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '';
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
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
  render() {
    const obj = urlParams(this.props.location.search);
    console.log(obj);
    return (
      <div>
        <Button type="primary">Primary</Button>
        <UploadImg></UploadImg>
      </div>
    );
  }
}

export default Home;

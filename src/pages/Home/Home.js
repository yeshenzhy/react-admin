import React from 'react';
import { Button, Upload, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { urlParams } from '@src/utils/tools';
import { testApi } from '@src/api/homeApi';
import emitter from '@src/utils/bus';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  headers: { Authorization: localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '' },
  action: 'http://service.yeshen1.cn/api/v1/upload',
  showUploadList: false,
  beforeUpload() {
    props.headers.Authorization = localStorage.getItem('token') ? `${'Bearer '}${JSON.parse(localStorage.getItem('token'))}` : '';
  },
  onChange(info) {
    const { status, response } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
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
class BlurExample extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'zzz');
    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    // this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }
  onClickHandler() {
    this.setState(data => {
      console.log(data, 'zz');
      return { isOpen: !data.isOpen };
    });
  }
  onBlurHandler(val) {
    console.log(val, this, 'blur');
    this.timeOutId = setTimeout(() => {
      this.setState({ isOpen: false });
    });
  }
  onFocusHandler() {
    console.log('focus');
    clearTimeout(this.timeOutId);
  }
  render() {
    // React 通过把失去焦点和获得焦点事件传输给父节点
    // 来帮助我们。
    return (
      <div
        onBlur={() => this.onBlurHandler(111)}
        onFocus={this.onFocusHandler}
      >
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
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
        <BlurExample name="zhy"></BlurExample>
      </div>
    );
  }
}

export default Home;

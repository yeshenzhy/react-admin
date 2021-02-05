import React, { useState, useEffect } from 'react';
import { Button, Upload, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
// import { urlParams } from '@src/utils/tools';
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
      message.success('图片上传成功！');
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
      Support
        </p>
      </Dragger>
    );
  }
}
@withRouter
class BlurExample extends React.Component {
  constructor(props) {
    super(props);
  }
  changeVal(val, val1, e) {
    console.log(val, val1, e.target, 'zvv');
    this.props.changeVal(val);
  }
  render() {
    // React 通过把失去焦点和获得焦点事件传输给父节点
    // 来帮助我们。
    return (
      <div>
        <p onClick={this.changeVal.bind(this, 'tom', 'zhy')}>我的名字{this.props.name}</p>
      </div>
    );
  }
}

const Example = () => {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState({
    name: 'tom',
    age: 18,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => ({ ...prev, age: ++prev.age }));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <p>name: {count.name}</p>
      <p>age: {count.age}</p>
      <button onClick={() => setCount()}>
        Click me
      </button>
    </div>
  );
};
@withRouter 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'zhy' };
  }
  goNext() {
    this.props.history.push({ pathname: '/knowLedge/syntax' });
  }
  // 测试
  test() {
    testApi({}).then(res => console.log(res));
  }
  changeVal(val, e) {
    console.log(val, e, 'zzz');
    this.setState({ name: val });
  }
  render() {
    // const obj = urlParams(this.props.location.search);
    
    return (
      <div>
        <Button type="primary" onClick={this.test}>Primary</Button>
        <UploadImg></UploadImg>
        <BlurExample name={this.state.name} changeVal={this.changeVal.bind(this)}></BlurExample>
        <Example></Example>
      </div>
    );
  }
}

export default Home;

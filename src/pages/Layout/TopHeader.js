import React from 'react';
import { Icon, Avatar, Dropdown, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import emitter from '@src/utils/bus';
import { inject } from 'mobx-react';

@withRouter
@inject('AppState')
class TopHeader extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }
  // 组件销毁前移除事件监听
  componentWillUnmount() {
    emitter.removeListener('updateUserInfo', this.updateUser);
  }
  componentWillMount() {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    // 声明一个自定义事件
    // 在组件装载完成以后
    this.eventEmitter = emitter.addListener('updateUserInfo', this.updateUser.bind(this));
    this.setState({ userInfo });
  }
  // 更新用户信息
  updateUser(userInfo) {
    this.setState({ userInfo });
  }
  // 导航侧边栏折叠
  toggle() {
    this.props.AppState.setCollapse();
  }
  // 头部设置
  setting() {}
  // 退出登录
  handleLogout() {
    localStorage.removeItem('userInfo');
    this.props.history.push('/');
  }
  render() {
    const DropdownList = (
      <Menu className="drop-list">
        <Menu.Item key="user">
          <Icon type="user" />
          {this.state.userInfo.name}
        </Menu.Item>
        <Menu.Item key="mobile">
          <Icon type="phone" />
          {this.state.userInfo.mobile}
        </Menu.Item>
        <Menu.Item key="logout" onClick={this.handleLogout.bind(this)}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="top-header">
        <div className="top-header-inner">
          <Icon
            className="trigger"
            // type={this.props.collapse.isCollapsed ? 'menu-unfold' : 'menu-fold'}
            type="menu-unfold"
            onClick={this.toggle}
          />
          <div className="header-title">React-antd-admin 通用后台管理系统</div>
          <div className="header-right">
            <div className="full-screen">
              {/* <FullScreen /> */}
            </div>
            <div className="setting">
              <Icon
                style={{ fontSize: '21px', cursor: 'pointer' }}
                type="setting"
                onClick={this.setting}
              />
            </div>
            <div className="dropdown-wrap" id="dropdown-wrap" style={{ cursor: 'pointer' }}>
              <Dropdown getPopupContainer={() => document.getElementById('dropdown-wrap')} overlay={DropdownList}>
                <div>
                  <Avatar size="large" icon="user" src={this.state.userInfo.avatar} />
                  <Icon style={{ color: 'rgba(0,0,0,.3)', cursor: 'pointer' }} type="caret-down" />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => ({
//   setCollapse: data => {
//     dispatch(setCollapse(data));
//   },
// });
// export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
export default TopHeader;

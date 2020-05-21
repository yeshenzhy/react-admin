import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setCollapse } from '../../redux/actions/setting';

class TopHeader extends React.Component {
  toggle() {
    this.props.setCollapse({ isCollapsed: !this.props.collapse.isCollapsed });
  }
  render() {
    return (
      <div className="top-header">
        <div className="top-header-inner">
          <div className="toggle-icon" onClick={this.toggle.bind(this)}>
            {this.props.collapse.isCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </div>
          <div className="header-title">React-antd-admin 通用后台管理系统</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setCollapse: data => {
    dispatch(setCollapse(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);

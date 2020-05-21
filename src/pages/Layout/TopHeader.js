import React from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { setCollapse } from '../../redux/actions/setting';

class TopHeader extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.props.setCollapse({ isCollapsed: !this.props.collapse.isCollapsed });
  }
  render() {
    return (
      <div className="top-header">
        <div className="top-header-inner">
          <Icon className="trigger" type={this.props.collapse.isCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
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

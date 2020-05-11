import React from 'react';
import {
  Redirect, withRouter, Route, Switch, 
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import allRoutes from '@src/router/routerMap';
import { connect } from 'react-redux';
import { Layout } from 'antd';

const { Content } = Layout;
// 路由渲染
const handleFilter = permission => {
  // 过滤没有权限的页面TODO:
  const roleType = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role.type || 1;
  if (!permission || permission === roleType) return true;
  return false;
};
const RouteComponent = route => {
  if (route.children) {
    return (route.children.map(item => (RouteComponent(item))));
  }
  if (handleFilter(route.permission)) {
    return (<Route render={() => <route.component />} key={route.path} path={route.path} />
    ); 
  }
};
// 路由表渲染
const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));

const MainContent = ({ location }) => (
  <TransitionGroup>
    <CSSTransition classNames="fade" key={location.pathname} timeout={500}>
      <Content style={{ padding: '15px' }}>
        <Switch>
          {renderRouteComponent(allRoutes)}
          <Redirect from="/" exact to="/home" />
          <Redirect to="/home" />
        </Switch>
      </Content>
    </CSSTransition>
  </TransitionGroup>
);

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default withRouter(connect(mapStateToProps)(MainContent));
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
const RouteComponent = route => {
  if (route.children) {
    return (route.children.map(item => (RouteComponent(item))));
  } 
  return (<Route exact key={route.path} path={route.path} component={route.component} />
  );
};
// 路由表渲染
const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));

// 带有layout的路由
const ComponentByLayout = () => {
  const isLogged = localStorage.getItem('isLogin') === '1';
  if (isLogged) { // 登录过则返回路由否则跳转到登录页
    return (
      renderRouteComponent(allRoutes)
    );
  }
  return (
    <Layout>
      <Redirect to="/login" />
    </Layout>
  );
};

const MainContent = ({ location }) => {
  const roleType = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role.type;

  const handleFilter = permission => {
    // 过滤没有权限的页面
    if (!permission || permission === roleType) return true;
    return false;
  };

  return (
    <TransitionGroup>
      <CSSTransition classNames="fade" key={location.pathname} timeout={500}>
        <Content style={{ padding: '15px' }}>
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/" component={ComponentByLayout} /> 
          </Switch>
        </Content>
      </CSSTransition>
    </TransitionGroup>
  );
};

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default withRouter(connect(mapStateToProps)(MainContent));

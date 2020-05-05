import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '@src/pages/Layout';
import allRoutes from './routerMap';
// 路由渲染
const RouteComponent = route => {
  if (route.children) {
    return (route.children.map(item => (RouteComponent(item))));
  } 
  return (<Route exact key={route.path} path={route.path} component={route.component} />);
};
// 路由表渲染
const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));

// 带有layout的路由
const ComponentByLayout = () => {
  const isLogged = localStorage.getItem('isLogin') === '1';
  if (!isLogged) { // 登录过则返回路由否则跳转到登录页
    return (
      <Layout>
        {renderRouteComponent(allRoutes.filter(route => route.layout))}
      </Layout>
    );
  }
  return (
    <Layout>
      <Redirect to="/login" />
    </Layout>
  );
};
class MainContent extends React.Component {
  render() {
    return (
      <Switch>
        {renderRouteComponent(allRoutes.filter(routes => !routes.layout))}
        <Route path="/" component={ComponentByLayout} />
      </Switch>
    );
  }
}
export default MainContent;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '@src/pages/Layout';
import allRoutes from './routerMap';
// 路由渲染
const RouteComponent = route => (
  <Route exact key={route.path} path={route.path} component={route.component} />
);
// 路由表渲染
const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));
// 带有layout的路由
const ComponentByLayout = () => (
  <Layout>
    {renderRouteComponent(allRoutes.filter(route => route.layout))}
  </Layout>
);

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

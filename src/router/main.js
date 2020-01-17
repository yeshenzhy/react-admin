import React from 'react'
import { Switch, Route} from 'react-router-dom';
import allRoutes from './routerMap';
import Layout from '../pages/Layout';
// 路由渲染
const RouteComponent = route => (
  <Route exact key={route.path} path={route.path} component={route.component} />
);
// 带有layout的路由
const ComponentByLayout = () => (
  <Layout>
    {renderRouteComponent(allRoutes.filter(route => route.layout))}
  </Layout>
);
// 路由表渲染
const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));
class MainContent extends React.Component{
  render(){
    return(
      <Switch>
        {renderRouteComponent(allRoutes.filter(routes => !routes.layout))}
        <Route path="/" component={ComponentByLayout} />
      </Switch>
    )
  }
}
export default MainContent

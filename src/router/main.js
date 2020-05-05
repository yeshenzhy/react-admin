// import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// // import Layout from '@src/pages/Layout';
// import allRoutes from './routerMap';
// // 路由渲染
// const RouteComponent = route => {
//   if (route.children) {
//     return (route.children.map(item => (RouteComponent(item))));
//   } 
//   return (<Route exact key={route.path} path={route.path} component={route.component} />);
// };
// // 路由表渲染
// const renderRouteComponent = routes => routes.map(route => (route.children ? route.children.map(item => RouteComponent(item)) : RouteComponent(route)));

// // 带有layout的路由
// const ComponentByLayout = () => {
//   const isLogged = localStorage.getItem('isLogin') === '1';
//   if (isLogged) { // 登录过则返回路由否则跳转到登录页
//     return (
//       renderRouteComponent(allRoutes.filter(route => route.layout))
//     );
//   }
//   return (
//     <Redirect to="/login" />
//   );
// };
// // 不带layout的路由
// const ComponentByNoLayout = () => {
//   const isLogged = localStorage.getItem('isLogin') === '1';
//   console.log(allRoutes.filter(route => !route.layout));
//   if (isLogged) { // 登录过则返回路由否则跳转到登录页
//     return (

//       renderRouteComponent(allRoutes.filter(route => !route.layout))
 
//     );
//   }
//   return (

//     <Redirect to="/login" />

//   );
// };
// class MainContents extends React.Component {
//   render() {
//     return (
//     // <Switch>
//       <Route path="/" component={ComponentByNoLayout} />
//     // </Switch>
//     );
//   }
// }
// export default MainContents;

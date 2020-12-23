import React from 'react';
import Loadable from 'react-loadable';

const asyncComponens = (url) => Loadable({
    loader: () => import(`../pages/${url}`),
    loading() {
      return <div>正在加载...</div>;
    },
  });

const routes = [
  {
    path: '/home',
    component: asyncComponens('Home/Home'),
    name: '首页',
    icon: 'database',
    layout: true,
  },
  {
    path: '/login',
    component: asyncComponens('Login/Login'),
    name: '登录',
    icon: 'database',
    layout: false
  },
  {
    path: '/knowLedge',
    name: 'react 知识点',
    icon: 'lock',
    layout: true,
    redirect: '/knowLedge/syntax',
    children: [
      {
        path: '/knowLedge/syntax/list',
        component: asyncComponens('KnowLedge/ChildChild'),
        name: 'ChildChild',
        layout: true,
      },
      {
        path: '/knowLedge/syntax/detail',
        component: asyncComponens('KnowLedge/MyCycle'),
        name: '我的',
        layout: true,
        permission: 1
      }
    ]
    // children: [
    //   {
    //     path: '/knowLedge/syntax',
    //     component: asyncComponens('KnowLedge/Syntax'),
    //     name: '常用语法',
    //     permission: 1, // 2表示无权限
    //     layout: true,
    //   },
    // ]
  },
];

export default routes;

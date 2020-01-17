import React from 'react';
import Loadable from 'react-loadable';

const asyncComponens = (url) => Loadable({
    loader: () => import(`../pages/${url}`),
    loading() {
      return <div>正在加载</div>;
    },
  });

const routes = [
  {
    path: '/',
    component: asyncComponens('home'),
    name: '首页',
    icon: 'database',
    auth: true,
    layout: true,
  },
  {
    path: '/knowLedge',
    name: 'react 知识点',
    icon: 'lock',
    auth: true,
    layout: true,
    redirect: '/knowLedge/syntax',
    children: [
      {
        path: '/knowLedge/syntax',
        component: asyncComponens('KnowLedge/Syntax'),
        name: '常用语法',
      },
      {
        path: '/knowLedge/life-cycle',
        component: asyncComponens('KnowLedge/LifeCycle'),
        name: '生命周期',
      }
    ],
  },
];

export default routes;

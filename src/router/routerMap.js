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
    component: asyncComponens('Home'),
    name: '首页',
    icon: 'database',
    auth: true,
    layout: true,
  },
  {
    path: '/login',
    component: asyncComponens('Login'),
    name: '登录',
    icon: 'database',
    auth: true,
    hidden: true,
    layout: false
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
        name: '生命周期',
        redirect: '/knowLedge/life-cycle/Childpage',
        children: [
          {
            path: '/knowLedge/life-cycle/Childpage',
            name: 'Childpage',
            redirect: '/knowLedge/life-cycle/Childpage/childchild',
            children: [
              {
                path: '/knowLedge/life-cycle/Childpage/childchild',
                component: asyncComponens('KnowLedge/ChildChild'),
                name: 'ChildChild'
              }
            ]
          }
        ]
      },
      {
        path: '/knowLedge/my-cycle',
        component: asyncComponens('KnowLedge/MyCycle'),
        name: '我的',
      }
    ],
  },
];

export default routes;

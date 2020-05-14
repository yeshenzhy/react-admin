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
    component: asyncComponens('Home'),
    name: '首页',
    icon: 'database',
    layout: true,
  },
  {
    path: '/login',
    component: asyncComponens('Login'),
    name: '登录',
    icon: 'database',
    layout: false
  },
  {
    path: '/knowLedge',
    name: 'react 知识点',
    icon: 'lock',
    layout: true,
    redirect: '/knowLedge/life-cycle',
    children: [
      {
        path: '/knowLedge/syntax',
        component: asyncComponens('KnowLedge/ChildChild'),
        name: '常用语法',
        permission: 1, // 2表示无权限
        layout: true,
        redirect: '/knowLedge/syntax/list',
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
            hidden: true,
            layout: true,
          }
        ]
      },
      {
        path: '/knowLedge/life-cycle',
        name: '生命周期',
        redirect: '/knowLedge/life-cycle/Childpage',
        layout: true,
        children: [
          {
            path: '/knowLedge/life-cycle/Childpage',
            name: 'Childpage',
            redirect: '/knowLedge/life-cycle/Childpage/childchild',
            layout: true,
            children: [
              {
                path: '/knowLedge/life-cycle/Childpage/childchild',
                component: asyncComponens('KnowLedge/ChildChild'),
                name: 'ChildChild',
                layout: true,
              }
            ]
          }
        ]
      },
    ],
  },
];

export default routes;

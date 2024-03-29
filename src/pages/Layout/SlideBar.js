import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import routes from '@src/router/routerMap';
import { observer, inject } from 'mobx-react';

const { Sider } = Layout;
const { SubMenu } = Menu;
// 判断路由权限
const handleFilter = permission => {
  // 过滤没有权限的页面TODO:
  // const roleType = localStorage.getItem('userInfo') || 1;
  if (!permission || permission === 1) return true;
  return false;
};
// 递归循环侧边导航
const createSubMenuComponents = (route, pathname, history) => {
  const children = route.children.filter(routes => !routes.hidden && routes.layout && handleFilter(routes.permission));
  return (
    <SubMenu
      key={route.path}
      title={(
        <span>
          <Icon type={route.icon} />
          <span>{route.name}</span>
        </span>
      )}
    >
      {
        children.map(item => {
          if (!item.showChild) {
            if (item.children) {
              return (
                <Menu.Item key={item.children[0].children ? item.children[0].children[0].path : item.children[0].path}>
                  <Link
                    to={item.children[0].children ? item.children[0].children[0].path : item.children[0].path}
                  >
                    {item.children[0].children ? item.children[0].children[0].name : item.children[0].name}
                  </Link>
                </Menu.Item>
              );
            } 
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          } 
          return createSubMenuComponents(item, pathname, history);
        })
      }
    </SubMenu>
  );
};
// 侧边路由子集处理
const routerChild = (routes) => routes.forEach((item) => {
  if (item.children) {
    const childLen = item.children.filter(child => !child.hidden).length;
    switch (childLen) {
      // 没有一个子菜单要显示
      case 0:
        item.showChild = false;
        break;
        // 只有一个子菜单要显示
      case 1:
        item.showChild = false;
        break;
      default:
        item.showChild = true;
        break;
    }
    routerChild(item.children);
  }
});
routerChild(routes);

const selectedRouter = (pathname, routes, parent) => {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === pathname) {
      if (parent) return parent;
      return routes[i];
    } 
    if (routes[i].children) {
      return selectedRouter(pathname, routes[i].children, routes[i].showChild ? '' : routes[i]);
    }
  }
};

@withRouter
@inject('AppState')
@observer
class SlideBar extends Component {
  onOpenChange = (openKeys) => {
    this.props.setOpenKeys([openKeys.pop()]);
  }
  render() {
    // 路由初始化处理
    const { AppState: { collapse } } = this.props;
    let menuSelected;
    const selectItem = selectedRouter(this.props.history.location.pathname, routes);
    if (selectItem) {
      if (selectItem.children) {
        menuSelected = selectItem.children[0].path;
      } else {
        menuSelected = selectItem.path;
      }
    } else {
      menuSelected = this.props.history.location.pathname;
    }
    const menuOpened = menuSelected.split('/');
    menuOpened.splice(0, 1);
    const menuArray = [];
    menuOpened.forEach((item, index) => {
      if (index === 0) {
        menuArray.push(`/${item}`);
      } else {
        menuArray.push(`${menuArray[index - 1]}/${item}`);
      }
    });
    return (
      <Sider
        className="app-sider"
        style={{ backgroundColor: 'rgb(48, 65, 86)' }}
        // collapsible
        collapsed={collapse}
      >
        <div className="logo" style={{ color: 'white' }}>
          <span className="iconfont icon-ye" style={{ color: '#FF9900', fontSize: '35px' }}></span>
          <span className="iconfont icon-shen" style={{ color: '#CC3333', fontSize: '35px' }}></span>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[menuSelected]}
          selectedKeys={[menuSelected]}
          defaultOpenKeys={[...menuArray]}
        >
          {
            routes.filter(route => !route.hidden && handleFilter(route.permission) && route.layout).map((item) => {
              if (!item.showChild) {
                if (item.children) {
                  return (
                    <Menu.Item key={item.children[0].path}>
                      <Link to={item.children[0].path}>
                        <Icon type={item.children[0].icon} />
                        <span>{item.children[0].name}</span>
                      </Link>
                    </Menu.Item>
                  );
                } 
                return (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
              return createSubMenuComponents(item);
            })
          }
        </Menu>
      </Sider>
    );
  }
}

export default SlideBar;


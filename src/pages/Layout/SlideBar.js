import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import routes from '@src/router/routerMap';
import { connect } from 'react-redux';

const { Sider } = Layout;
const { SubMenu } = Menu;
// import connect from '@connect';
// 判断路由权限
const handleFilter = permission => {
  // 过滤没有权限的页面TODO:
  const roleType = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role.type || 1;
  if (!permission || permission === roleType) return true;
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
// console.log(routes);
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
// @connect
@withRouter
class SlideBar extends Component {
  onOpenChange = (openKeys) => {
    this.props.setOpenKeys([openKeys.pop()]);
  }
  render() {
    // const {
    //   openkeys, breadCrumbs, collapsed, routes,
    // } = this.props.appReducer;
    // const { location: { pathname }, history } = this.props;
    // 路由初始化处理
    const { collapse } = this.props;
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
        trigger
        collapsible
        collapsed={collapse.isCollapsed}
      >
        <div className="logo" style={{ color: 'white' }}>
          Logo
        </div>
        <Menu

          mode="inline"
          theme="dark"
          defaultSelectedKeys={[menuSelected]}
          selectedKeys={[menuSelected]}
          defaultOpenKeys={[...menuArray]}
          inlineCollapsed={collapse.isCollapsed}
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
const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => ({
//   setCollapse: data => {
//     dispatch(setCollapse(data));
//   },
// });
export default connect(mapStateToProps)(SlideBar);
// export default SlideBar;


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import routes from '@src/router/routerMap'
const { Sider } = Layout;
const { SubMenu } = Menu;
const createSubMenuComponents = (route, pathname, history) => {
  const children = route.children.filter(routes => !routes.hidden);
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
        children.map(item => (!item.children
          ? (
            <Menu.Item key={item.path}>
              <Link
                to={item.path}

              >
                {item.name}
              </Link>
            </Menu.Item>
          ) : createSubMenuComponents(item, pathname, history)))
      }
    </SubMenu>
  );
};

class SlideBar extends Component {
  onOpenChange = (openKeys) => {
    this.props.setOpenKeys([openKeys.pop()]);
  }

  render() {
    // const {
    //   openkeys, breadCrumbs, collapsed, routes,
    // } = this.props.appReducer;
    // const { location: { pathname }, history } = this.props;
    return (
      <Sider className="app-sider"
        trigger
        collapsed={false}
      >
        <div className="logo" style={{color: "white"}}>
          Logo
        </div>
        <Menu
          mode="inline"
          theme="dark"
          // onOpenChange={this.onOpenChange}
          // openKeys={openkeys}
          // selectedKeys={[breadCrumbs[breadCrumbs.length - 1].path]}
        >
          {
            routes.filter(route => !route.hidden).map((item) => {
              if (!item.children) {
                return (
                  <Menu.Item key={item.path}>
                    <Link
                      to={item.path}
                    >
                      <div>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                      </div>
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


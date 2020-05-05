import React, { Component } from 'react';
import { Layout } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import allRoutes from '@src/router/routerMap';
import SlideBar from './SlideBar';
import MainContent from './MainContent';

@withRouter
class Index extends Component {
  render() {
    const noLayoutArr = allRoutes.filter(route => !route.layout);
    const isLayout = noLayoutArr.find(item => item.path === this.props.location.pathname);

    console.log(noLayoutArr);
    return (
      <div className="layout">
        <Layout style={{ minHeight: '100vh' }}>
          {!isLayout ? <SlideBar /> : ''}
          <Layout>
            <MainContent />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index;

import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import allRoutes from '@src/router/routerMap';
import SlideBar from './SlideBar';
import MainContent from './MainContent';
import TopHeader from './TopHeader';

@withRouter
class Index extends Component {
  render() {
    const noLayoutArr = allRoutes.filter(route => { return !route.layout; });
    const isLayout = noLayoutArr.find(item => { return item.path === this.props.location.pathname; });
    return (
      <div className="layout">
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
          {!isLayout ? <SlideBar /> : ''}
          <Layout>
            <TopHeader />
            <MainContent />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index;

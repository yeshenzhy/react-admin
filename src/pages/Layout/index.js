import React, { Component } from 'react';
import SlideBar from './SlideBar';
import { Layout } from 'antd';
class Index extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <Layout style={{ minHeight: '100vh' }}>
          <SlideBar />
          <Layout>
            {children}
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Index;

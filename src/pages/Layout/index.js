import React, { Component } from 'react';
import { Layout } from 'antd';
import SlideBar from './SlideBar';

class Index extends Component {
  render() {
    const { children } = this.props;
    console.log(this.props);
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

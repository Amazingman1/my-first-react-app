import React, { Component } from 'react';
import { Layout } from 'antd';

import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import ContainerMain from '@/components/containerMain/index'
import './layout.scss';

const {Sider, Header, Content } = Layout

class Index extends Component{
  constructor(props){
    super(props);
    this.state= {};
  }
  render(){
    return (
      <Layout className="layout-wrap">
        <Header className="layout-header"><LayoutHeader /></Header>
        <Layout>
          <Sider width="250px"><LayoutAside /></Sider>
          <Content className="layout-min"><ContainerMain /></Content>
        </Layout>
      </Layout>
    )
  }
}

export default Index
import React, { Component } from 'react';
import { Layout } from 'antd';
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
        <Sider width="250px">菜单</Sider>
        <Layout>
        <Header className="layout-header">Header</Header>
        <Content className="layout-min">Content</Content>
      </Layout>
      </Layout>
    )
  }
}

export default Index
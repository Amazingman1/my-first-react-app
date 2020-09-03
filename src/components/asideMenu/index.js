import React, {Component, Fragment} from 'react'
import { LaptopOutlined } from '@ant-design/icons';
import { Menu } from 'antd'

const { SubMenu } = Menu

class AsideMenu extends  Component {
  constructor(props){
    super(props)
    this.state ={}
  }
  render() {
    return(
      <Fragment>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="5">控制台</Menu.Item>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
        </Menu>
      </Fragment>
    )
  }

}

export default AsideMenu
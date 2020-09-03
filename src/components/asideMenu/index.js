import React, {Component, Fragment} from 'react'
import { LaptopOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import Router from '@/router/index'
import { Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu

class AsideMenu extends  Component {
  constructor(props){
    super(props)
    this.state ={}
  }
  // 子集菜单处理
  renderSubMenuz = ({title, key, children}) => {
    return (
      <SubMenu key={key} icon={<LaptopOutlined />} title={title}>
        {
          children && children.map(p => {
            return p.children && p.children.length > 0 ? this.renderSubMenuz(p): this.renderMenu(p)
          })          
        }
    </SubMenu>
    )
  }
  // 无子集菜单处理
  renderMenu = ({title, key}) => {
    return (
    <Menu.Item key={key}>
      <Link to={key}>{title}</Link>
      </Menu.Item>
    )
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
          {
            Router && Router.map(v => {
              return v.children && v.children.length > 0 ? this.renderSubMenuz(v) : this.renderMenu(v)
            })
          }
        </Menu>
      </Fragment>
    )
  }

}

export default AsideMenu
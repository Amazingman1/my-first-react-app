import React, { Component, Fragment } from 'react'
import { LaptopOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import Router from '@/router/index'
import { Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu

class AsideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
      selectedKeys: []
    }
  }
  // 子集菜单处理
  renderSubMenuz = ({ title, key, children }) => {
    return (
      <SubMenu key={key} icon={<LaptopOutlined />} title={title}>
        {
          children && children.map(p => {
            return p.children && p.children.length > 0 ? this.renderSubMenuz(p) : this.renderMenu(p)
          })
        }
      </SubMenu>
    )
  }
  // 无子集菜单处理
  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    )
  }
  // 选中菜单
  selectMenu = ({ item, key, keyPath, domEvent }) => {
    const menuHight = {
      openKeys: keyPath[keyPath.length - 1],
      selectedKeys: key
    }
    this.selectMenuHight(menuHight)
  }
  // 选中菜单高光
  selectMenuHight = (val) => {
    this.setState({
      openKeys: [val.openKeys],
      selectedKeys: [val.selectedKeys]
    })
  }
  openMenu = (openKeys) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]]
    })
  }
  // dom渲染后调用的钩子函数
  componentDidMount() {
    const pathname = this.props.location.pathname
    const menuKey = pathname.split("/").slice(0, 3).join('/');
    const menuHight = {
      openKeys: menuKey,
      selectedKeys: pathname
    }
    this.selectMenuHight(menuHight)
  }
  render() {
    const { openKeys, selectedKeys } = this.state
    return (
      <Fragment>
        <Menu
          onOpenChange={this.openMenu}
          onClick={this.selectMenu}
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
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

export default withRouter(AsideMenu)
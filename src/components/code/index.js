import React, { Component } from 'react'
import { Button, message } from 'antd';
import { GetCodeApi } from '@/api/account'
let timer = null

class Code extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.username,
      btnText: '获取验证码',
      codeLoading: false,
      btnDisabled: false,
    }
  }
  // 监听父组件props函数
  UNSAFE_componentWillReceiveProps({ username }) {
    this.setState({
      username
    })
  }
  // 组件销毁的的钩子函数
  componentWillUnmount() {
    clearInterval(timer)

  }
    // 获取验证码
  getCode = () => {
    if( !this.state.username) {
      message.warning('用户名不能为空!!', 2)
      return
    }
  
    this.setState({
      codeLoading: true,
      btnText: '发送中...'
    })
    const data = {
      username: this.state.username,
      module: 'login'
    }
    GetCodeApi(data).then(res => {
      console.log(res, '获取验证码')
      this.setState({
          // codeLoading: false
      })
        this.countDown()
    }).catch(() => {
      this.setState({
        codeLoading: false,
        btnText: '重新获取...'
      })
    })
  }
      /** 倒计时 */
  countDown = () => {
    let esc = 60
    this.setState({
      codeLoading: true,
      btnDisabled: true,
      btnText: `${esc}s`
    })
    timer = setInterval(() => {
      // console.log(12323)
      esc--
      if (esc <= 0) {
        clearInterval(timer)
        this.setState({
          btnDisabled: false,
          codeLoading: false,
          btnText: '重新获取...',
        })
        return
      }
      this.setState({
        btnText: `${esc}s`
      })
    }, 1000);

  }
  render() {
   return <Button type="danger" loading={this.state.codeLoading} disabled={this.state.btnDisabled}  block onClick={ this.getCode }>{this.state.btnText}</Button>
  }
}

export default Code
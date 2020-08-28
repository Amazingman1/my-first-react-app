import React, {Component} from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login, GetCodeApi } from '@/api/account'

// 409019683@qq.com
class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      codeLoading: false,
      btnDisabled: false,
      btnText: '获取验证码'
    }
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
    Login().then(res => {
      console.log(res, '登陆')
    })
  }
  toogleForm = () => {
    this.props.switchForm('regiest')
  }
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
    let esc = 5
    this.setState({
      codeLoading: true,
      btnDisabled: true,
      btnText: `${esc}s`
    })
    let timer = null
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
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      username: value
    })
  }
  render() {
    const { username, codeLoading, btnDisabled } = this.state
    return (
      <div className="form-warp">
        <div>
          <div className="form-header">
            <h4 className="column">登 陆</h4>
            <span onClick={this.toogleForm}>账号注册</span>
          </div>
          <div className="form-content">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item name="username" rules={
                [
                  { required: true, message: '用户名不能为空!' },
                  { type: 'email', message: '请输入正确的邮箱!' }
                ]
              }>
                <Input value={ username } onChange={ this.inputChange } prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
              </Form.Item>
              <Form.Item name="password" rules={
                [
                  { required: true, message: '密码不能为空!' },
                  { min: 6, message: "密码不能小于6位！" }
                ]
              }>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Row gutter={13}>
                  <Col span={15}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                  </Col>
                  <Col span={9}>
                    <Button type="danger" loading={ codeLoading } disabled={ btnDisabled } block onClick={ this.getCode }>{this.state.btnText}</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>登 陆</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
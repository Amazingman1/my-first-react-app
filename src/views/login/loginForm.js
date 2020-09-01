import React, {Component} from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '@/api/account'
import Code from '@/components/code/index'
import { validPassword } from '@/utils/vaildate'
import CryptoJs from 'crypto-js'

// 409019683@qq.com
class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      btnText: '获取验证码',
      module: 'login',
      code: '',
      password: '',
      longLoading: false
    }
  }
  onFinish = values => {
    this.setState({
      longLoading: true
    })
    const data = {
      username:this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code:this.state.code
    }
    Login(data).then(res => {
      console.log(res, '登陆')
      this.setState({
        longLoading: false
      })
    }).catch(() => {
      this.setState({
        longLoading: false
      })
    })
  }
  toogleForm = () => {
    this.props.switchForm('regiest')
  }
  // 处理输入框
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      username: value
    })
  }
  inputPass = (e) => {
    let value = e.target.value
    this.setState({
      password: value
    })
  }
  inputCode = (e) => {
    let value = e.target.value
    this.setState({
      code: value
    })
  }
  render() {
    const { username, module } = this.state
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
                  ({ getFieldValue }) => ({
                    validator(role, value){
                      if(!validPassword(value)){
                        return Promise.reject('请输入大于6位小于20位数字+字母')
                      }
                      return Promise.resolve()
                    }
                  })
                ]
              }>
                <Input type="password" onChange={this.inputPass} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Row gutter={13}>
                  <Col span={15}>
                    <Input onChange={this.inputCode} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                  </Col>
                  <Col span={9}>
                    <Code username={username} module={module} />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={this.state.longLoading} htmlType="submit" className="login-form-button" block>登 陆</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
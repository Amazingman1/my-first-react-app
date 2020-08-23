import React, {Component} from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login } from '@/api/account'

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {}
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
  render() {
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
                  <Col span={16}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                  </Col>
                  <Col span={8}>
                    <Button type="danger" block>获取验证码</Button>
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
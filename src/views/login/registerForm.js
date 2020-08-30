import React, {Component} from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Code from '@/components/code/index'

class registerForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: ''
    }
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
  }
  toogleForm = () => {
    this.props.switchForm('login')
  }

  render() {
    const { username } = this.state
    return (
      <div className="form-warp">
        <div>
          <div className="form-header">
            <h4 className="column">登 陆</h4>
            <span onClick={this.toogleForm}>登 陆</span>
          </div>
          <div className="form-content">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item name="passwords" rules={[{ required: true, message: 'Please input your passwords!' }]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Passwords" />
              </Form.Item>
              <Form.Item name="code" rules={[{ required: true, message: 'Please input your Code!' }]}>
                <Row gutter={13}>
                  <Col span={16}>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                  </Col>
                  <Col span={8}>
                    <Code username={username} />
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
export default registerForm
import React, {Component} from 'react';
import './index.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Code from '@/components/code/index'
import { validPassword } from '@/utils/vaildate'
import { RegisterApi } from '@/api/account'


class registerForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      module: 'register',
      code: '',
      password: ''
    }
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
  }
  toogleForm = () => {
    this.props.switchForm('login')
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
  onFinish = () => {
    const data ={
      username:this.state.username,
      password: this.state.password,
      code:this.state.code
    }
    RegisterApi(data).then(res => {

    })
  } 
  render() {
    const { username, module } = this.state
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
                <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={[
                { required: true, message: '密码不能为空!' },
                ({ getFieldValue }) => ({
                  validator(role, value){
                    const passworldValue = getFieldValue('passwords')
                    if(!validPassword(value)){
                      return Promise.reject('请输入大于6位小于20位数字+字母')
                    }
                    if (passworldValue && value !== passworldValue){
                      return Promise.reject('两次密码不一致！')
                    }
                    return Promise.resolve()
                  }
                })
              ]}>
                <Input onChange={this.inputPass} type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item name="passwords" rules={[
                { required: true, message: '再次确认密码不能为空！' },
                ({ getFieldValue }) => ({
                  validator(role, value){
                    if(value !== getFieldValue('password') ){
                      return Promise.reject('两次密码不一致！！')
                    }
                    return Promise.resolve()
                  }
                })
              ]}>
                <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Passwords" />
              </Form.Item>
              <Form.Item name="code" rules={[{ required: true, message: '请输入6位验证码', len: 6 }]}>
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
                <Button onClick={this.onFinish} type="primary" htmlType="submit" className="login-form-button" block>注 册</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default registerForm
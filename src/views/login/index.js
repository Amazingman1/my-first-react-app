import React, {Component} from 'react';
import './index.scss';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      formType: 'login'
    }
  }
  switchForm = (values) => {
    this.setState({
      formType: values
    })
  }
  render() {
    return (
      <div className="form-warp">
        <div>
          {
            this.state.formType === 'login'
            ? <LoginForm switchForm={this.switchForm} /> 
            : <RegisterForm switchForm={this.switchForm} />
          }
        </div>
      </div>
    )
  }
}
export default Login
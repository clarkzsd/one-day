import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/icon.jpg';
import background from '../../../public/background.jpg';
import './style.scss';

class LoginScreen extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  }
  handleLogin = () => {
    console.log(this.state.user);
  }
  handleFormChange = (e) => {
    const { name, value } = e.target;
    const newUser = {
      ...this.state.user,
      [name]: value
    };
    this.setState({user: newUser});
  }
  render () {
    const { email, password } = this.state.user;
    return (
      <section className='login-container' style={{ backgroundImage: `url(${background})` }}>
        <main className='login-container__content'>
          <div className='login-container__logo'>
            <img src={logo} alt='logo' />
          </div>
          <form className='login-container__form'>
            <div className='form-field'>
              <input name='email' type='email' placeholder='邮箱' value={email} onChange={this.handleFormChange} />
            </div>
            <div className='form-field'>
              <input name='password' type='password' placeholder='密码' value={password} onChange={this.handleFormChange} />
            </div>
            <button className='submit-btn' onClick={this.handleLogin}>登录</button>
          </form>
          <span className='login-container__signup-tip'>没有账户？<Link to='/signup'>立即注册</Link></span>
        </main>
      </section>
    );
  }
}

export default LoginScreen;

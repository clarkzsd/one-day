import React, { Component } from 'react';
import Header from '../../components/UI/Header';
import background from '../../../public/login-bg.jpg';
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
      <div className='login-container' style={{ backgroundImage: `url(${background})` }}>
        <Header
          largeTitle='One day'
        />
        <main className='login-container__content'>
          <p className='login-container__slogan'>
            Sign in to start your brand new day!
          </p>
          <form className='login-container__form'>
            <div className='formField'>
              <input autoComplete='username' name='email' type='email' placeholder='测试帐号: robot-walle' value={email} onChange={this.handleFormChange} />
            </div>
            <div className='formField'>
              <input
                name='password'
                autoComplete='current-password'
                type='password'
                placeholder='测试密码：569587'
                value={password}
                onChange={this.handleFormChange} />
            </div>
            <button className='login-container__submitBtn' onClick={this.handleLogin}>Login</button>
          </form>
        </main>
      </div>
    );
  }
}

export default LoginScreen;

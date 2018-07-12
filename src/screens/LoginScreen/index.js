import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/UI/Header';

import { userLogin } from './action';
import background from '../../../public/login-bg.jpg';
import './style.scss';

class LoginScreen extends Component {
  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    user: {
      username: '',
      password: ''
    }
  }
  handleLogin = (e) => {
    e.preventDefault();
    console.log(this.state.user);
    const { history, userLogin } = this.props;
    userLogin(this.state.user).then(
      () => {
        history.push('/');
      },
      (err) => {
        return err;
      }
    );
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
    const { username, password } = this.state.user;
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
              <input
                required
                autoComplete='username'
                name='username'
                type='text'
                placeholder='测试帐号: robot-walle'
                value={username}
                onChange={this.handleFormChange} />
            </div>
            <div className='formField'>
              <input
                required
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

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user) => dispatch(userLogin(user))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LoginScreen));

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { closeSnackBar, openSnackBar } from '../components/action';
import TodoListScreen from '../screens/TodoListScreen';
import LoginScreen from '../screens/LoginScreen';
import ProjectScreen from '../screens/ProjectScreen';
import SnackBar from '../components/UI/SnackBar';
import Drawer from '../components/Drawer';

import { isLogin } from '../base/utils/auth';

console.log('meiyou', isLogin());

moment.locale('zh-cn');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

class AppRoute extends Component {
  static propTypes = {
    closeSnackBar: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    isSnackBarOpen: PropTypes.bool.isRequired,
    snackBarMessage: PropTypes.string.isRequired
  }
  render () {
    const { closeSnackBar, isSnackBarOpen, snackBarMessage, openSnackBar } = this.props;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <PrivateRoute exact path='/' component={TodoListScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <PrivateRoute exact path='/projects/:id' component={ProjectScreen} />
          </Switch>
          <SnackBar
            isOpen={isSnackBarOpen}
            onClose={closeSnackBar}
            message={snackBarMessage}
          />
          <Drawer
            openSnackBar={openSnackBar}
          />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackBar: () => dispatch(closeSnackBar()),
    openSnackBar: (message) => dispatch(openSnackBar(message))
  };
};

const mapStateToProps = ({ ui }) => {
  return {
    isSnackBarOpen: ui.snackBar.isOpen,
    snackBarMessage: ui.snackBar.message
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);

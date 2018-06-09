import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { closeSnackBar, openSnackBar } from '../actions/ui';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import LoginScreen from '../screens/LoginScreen';
import ArchiveListScreen from '../screens/ArchiveListScreen';
import SnackBar from '../components/UI/SnackBar';
import Drawer from '../components/UI/Drawer';

moment.locale('zh-cn');

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
            <Route exact path='/' component={TodoListScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/archive' component={ArchiveListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
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

const mapStateToProps = ({ snackBar }) => {
  return {
    isSnackBarOpen: snackBar.isOpen,
    snackBarMessage: snackBar.message
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);

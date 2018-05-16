import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeDrawer } from '../actions/ui';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import ArchiveListScreen from '../screens/ArchiveListScreen';
import SnackBar from '../components/UI/SnackBar';
import Drawer from '../components/UI/Drawer';
import EditTodoModal from '../components/EditTodoModal';

class AppRoute extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={TodoListScreen} />
            <Route exact path='/archive' component={ArchiveListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
          </Switch>
          <SnackBar />
          { this.props.isModalTriggered && <EditTodoModal /> }
          <Drawer
            isOpen={this.props.isDrawerOpen}
            onClosePress={this.props.closeDrawer}
          />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ drawer, modal }) => {
  return {
    isDrawerOpen: drawer.isOpen,
    isModalTriggered: modal.isTriggered
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  };
};

AppRoute.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isModalTriggered: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);

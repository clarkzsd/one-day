import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeDrawer } from '../actions/ui';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import ArchieveListScreen from '../screens/ArchieveListScreen';
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
            <Route exact path='/archieve' component={ArchieveListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
          </Switch>
          <SnackBar />
          { this.props.isModalDriggered && <EditTodoModal /> }
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
    isModalDriggered: modal.isTriggered
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  };
};

AppRoute.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isModalDriggered: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);

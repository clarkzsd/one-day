import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
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
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          >
            <Route exact path='/' component={TodoListScreen} />
            <Route exact path='/archieve' component={ArchieveListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
          </AnimatedSwitch>
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

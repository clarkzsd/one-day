import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ToolBar from '../../components/UI/ToolBar';
import CreateTodoForm from '../../components/CreateTodo/Form';
import './style.scss';

class CreateTodoScreen extends Component {
  goBack = () => {
    this.props.history.goBack();
  }
  render () {
    return (
      <div className='create-todo-screen'>
        <ToolBar
          left={<i className='material-icons'>arrow_back</i>}
          onLeftPress={this.goBack}
          title='添加新事项'
        />
        <CreateTodoForm />
      </div>
    );
  }
}

CreateTodoScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(CreateTodoScreen);

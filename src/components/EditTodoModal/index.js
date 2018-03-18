import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal, openNotification } from '../../actions/ui';
import { editTodo } from '../../actions/todo';
import Modal from './Modal';

class EditTodoModal extends Component {
  handleUpdateTodo = (todo) => {
    try {
      this.props.editTodo(todo);
      this.props.openNotification('修改成功👌');
      this.props.closeModal();
    } catch (err) {
      this.props.openNotification('发生错误😥');
    }
  }
  render () {
    const { isTriggered, editingTodo, closeModal } = this.props;
    return (
      <div className='edit-todo-modal'>
        {isTriggered &&
          <Modal {...editingTodo}
            onCancel={closeModal}
            onConfirm={this.handleUpdateTodo}
          />}
      </div>
    );
  }
}

const mapStateToProps = ({ modal }) => {
  return {
    isTriggered: modal.isTriggered,
    editingTodo: modal.editingTodo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    editTodo: (todo) => dispatch(editTodo(todo)),
    openNotification: (message) => dispatch(openNotification(message))
  };
};

EditTodoModal.propTypes = {
  isTriggered: PropTypes.bool.isRequired,
  editingTodo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoModal);

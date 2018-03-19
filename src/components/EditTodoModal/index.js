import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { closeModal, openNotification } from '../../actions/ui';
import { editTodo } from '../../actions/todo';
import Modal from '../UI/Modal';

const statusList = [
  {
    value: 'urgent',
    option: '紧急'
  }, {
    value: 'primary',
    option: '重要'
  }, {
    value: 'secondary',
    option: '次要'
  }
];

class EditTodoModal extends Component {
  state = {
    status: this.props.editingTodo.status,
    title: this.props.editingTodo.title,
    deadline: moment.unix(this.props.editingTodo.deadline)
  }
  handleUpdateTodo = () => {
    const { title, deadline, status } = this.state;
    const todo = {
      ...this.props.editingTodo,
      status,
      deadline: deadline ? deadline.unix() : moment().unix(),
      title: title.length > 0 ? title : '写点什么吧'
    };
    try {
      this.props.editTodo(todo);
      this.props.openNotification('修改成功👌');
      this.props.closeModal();
    } catch (err) {
      this.props.openNotification('发生错误😥');
    }
  }
  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleDateChange = (date) => {
    this.setState({
      deadline: date
    });
  }
  render () {
    const { status, title, deadline } = this.state;
    const { closeModal } = this.props;
    return (
      <Modal
        title='编辑事项'
        footer={[
          <button type='button' key='cancel' onClick={closeModal}>取消</button>,
          <button type='button' key='confirm' onClick={this.handleUpdateTodo}>提交</button>
        ]}
      >
        <form>
          <div className='form-field selector'>
            <select name='status' value={status} onChange={this.onFieldChange}>
              {
                statusList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.option}
                  </option>
                ))
              }
            </select>
          </div>
          <div className='form-field'>
            <input
              type='text'
              name='title'
              placeholder='事项名称'
              value={title}
              onChange={this.onFieldChange}
            />
          </div>
          <div className='form-field'>
            <DatePicker
              placeholderText='选择deadline'
              selected={deadline}
              onChange={this.handleDateChange}
            />
          </div>
        </form>
      </Modal>
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
  editingTodo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoModal);

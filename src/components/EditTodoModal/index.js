import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
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
    this.props.onSubmitForm(todo);
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
    const { onCancel } = this.props;
    return (
      <Modal
        title='编辑事项'
        footer={[
          <button type='button' key='cancel' onClick={onCancel}>取消</button>,
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

EditTodoModal.propTypes = {
  editingTodo: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired
};

export default EditTodoModal;

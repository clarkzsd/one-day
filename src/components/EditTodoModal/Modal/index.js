import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

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

class Modal extends Component {
  state = {
    status: this.props.status,
    title: this.props.title,
    deadline: moment.unix(this.props.deadline)
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
  handleSubmitForm = () => {
    const { title, deadline, status } = this.state;
    const todo = {
      status,
      id: this.props.id,
      deadline: deadline ? deadline.unix() : moment().unix(),
      title: title.length > 0 ? title : '写点什么吧'
    };
    this.props.onConfirm(todo);
  }
  render () {
    const { status, title, deadline } = this.state;
    const { onCancel } = this.props;
    return (
      <div className='modal'>
        <div className='modal-mask' />
        <div className='modal-wrapper'>
          <div className='modal-content'>
            <header className='modal-header'>
              <h4 className='modal-title'>编辑任务</h4>
            </header>
            <div className='modal-body edit-form'>
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
            </div>
            <footer className='modal-footer'>
              <button type='button' className='modal-btn' onClick={onCancel}>取消</button>
              <button type='button' className='modal-btn' onClick={this.handleSubmitForm}>提交</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deadline: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default Modal;

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';

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

class CreateTodoForm extends Component {
  state = {
    status: 'urgent',
    title: '',
    deadline: null
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

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.length === 0) {
      console.log({ ...this.state, title: '写点什么吧', deadline: moment() });
    }
    console.log(this.state);
  }

  render () {
    const { status, title, deadline } = this.state;
    return (
      <div className='create-todo-form'>
        <div className='inner'>
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
              <input name='title' placeholder='事项名称' value={title} onChange={this.onFieldChange} />
            </div>
            <div className='form-field'>
              <DatePicker
                placeholderText='选择deadline'
                selected={deadline}
                onChange={this.handleDateChange}
              />
            </div>
            <button className='submit-btn' onClick={this.onSubmit}>添加</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTodoForm;

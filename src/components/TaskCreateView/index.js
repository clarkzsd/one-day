import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rmc-date-picker';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import Popup from 'rmc-picker/lib/Popup';
import Picker from 'rmc-picker';
import zh_CN from 'rmc-date-picker/lib/locale/zh_CN';
import Header from '../UI/Header';
import { taskDegreeList, taskDegree } from '../../base/constants/task';
import './style.scss';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

export const minDate = new Date(2015, 8, 15, 10, 30, 0);
export const maxDate = new Date(2049, 1, 1, 23, 49, 59);
export let now = new Date();

export function format (date) {
  let mday = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  mday = mday < 10 ? `0${mday}` : mday;
  return `${date.getFullYear()}-${month}-${mday}`;
}

class TaskCreateView extends Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired
  }

  state = {
    degree: null,
    title: '',
    detail: '',
    project: null,
    deadline: null,
    assign_date: null
  }

  handleSubmit = () => {
    const { degree, title, detail, deadline, assign_date, project } = this.state;
    const { onSubmit, openSnackBar } = this.props;
    const data = {
      title,
      detail,
      degree,
      project_id: project ? project.id : null,
      deadline,
      assign_date
    };

    // validation
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] === '' || data[key] === null) {
          return openSnackBar(`${key.toUpperCase} 不能为空`);
        };
      }
    }

    onSubmit && onSubmit(data);
  }

  onDegreeChange = (degree) => {
    this.setState({degree});
  }

  onProjectChange = (project) => {
    this.setState({project});
  }

  onProjectPopupDismiss = () => {
    this.setState({project: null});
  }

  onFormFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onDeadlineChange = (deadline) => {
    this.setState({
      deadline
    });
  }

  onAssignDateChange = (date) => {
    this.setState({
      assign_date: date
    });
  }

  renderDegreePicker = () => {
    const { degree } = this.state;
    return (
      <Popup
        transitionName='rmc-picker-popup-slide-fade'
        maskTransitionName='rmc-picker-popup-fade'
        content={
          <Picker
            selectedValue={this.state.degree}
            onValueChange={this.onDegreeChange}
          >
            {
              taskDegreeList.map((item) => (
                <Picker.Item key={item.key} value={item.key}>
                  {item.value.toUpperCase()}
                </Picker.Item>
              ))
            }
          </Picker>
        }
        title='所属项目'
        onDismiss={this.onProjectPopupDismiss}
      >
        <div className='formField'>
          <div className='inner'>
            <label htmlFor='taskDegree'>Degree</label>
            <input type='text' id='taskDegree' name='degree' value={degree !== null ? taskDegree[degree] : ''} />
          </div>
        </div>
      </Popup>
    );
  }

  renderProjectPicker = () => {
    const { project } = this.state;
    const { projects } = this.props;
    return (
      <Popup
        transitionName='rmc-picker-popup-slide-fade'
        maskTransitionName='rmc-picker-popup-fade'
        content={
          <Picker
            selectedValue={this.state.project}
            onValueChange={this.onProjectChange}
          >
            {
              projects.map((item) => (
                <Picker.Item key={item.id} value={item}>
                  {item.name}
                </Picker.Item>
              ))
            }
          </Picker>
        }
        title='所属项目'
        onDismiss={this.onProjectPopupDismiss}
      >
        <div className='formField'>
          <div className='inner'>
            <label htmlFor='taskProject'>Belong To</label>
            <input type='text' id='taskProject' name='project' value={project ? project.name : ''} />
          </div>
        </div>
      </Popup>
    );
  }

  render () {
    const { closeView } = this.props;
    const { deadline, assign_date, title, detail } = this.state;
    const datePicker = (
      <DatePicker
        rootNativeProps={{'data-xx': 'yy'}}
        minDate={minDate}
        maxDate={maxDate}
        defaultDate={now}
        mode='date'
        locale={zh_CN}
      />
    );
    return (
      <div className='taskCreateView'>
        <Header
          largeTitle='添加任务'
          leftIcon={<i className='material-icons'>close</i>}
          rightContent='提交'
          onRightPress={this.handleSubmit}
          onLeftPress={closeView}
        />
        <form className='taskCreateView__form'>
          <div className='formField'>
            <div className='inner'>
              <label htmlFor='taskTitle'>Title</label>
              <input onChange={this.onFormFieldChange} type='text' maxLength='10' id='taskTitle' name='title' value={title} />
            </div>
          </div>
          <div className='formField'>
            <div className='inner'>
              <label htmlFor='taskDetail'>Detail</label>
              <input onChange={this.onFormFieldChange} type='text' id='taskDetail' name='detail' value={detail} />
            </div>
          </div>
          { this.renderDegreePicker() }
          { this.renderProjectPicker() }
          <PopupDatePicker
            datePicker={datePicker}
            transitionName='rmc-picker-popup-slide-fade'
            maskTransitionName='rmc-picker-popup-fade'
            title='Date picker'
            date={deadline}
            onChange={this.onDeadlineChange}
          >
            <div className='formField'>
              <div className='inner'>
                <label htmlFor='taskDeadline'>Deadline</label>
                <input type='text' id='taskDeadline' value={(deadline && format(deadline)) || ''} />
              </div>
            </div>
          </PopupDatePicker>
          <PopupDatePicker
            datePicker={datePicker}
            transitionName='rmc-picker-popup-slide-fade'
            maskTransitionName='rmc-picker-popup-fade'
            title='Assign date picker'
            date={assign_date}
            onChange={this.onAssignDateChange}
          >
            <div className='formField'>
              <div className='inner'>
                <label htmlFor='taskAssignDate'>Assign date</label>
                <input type='text' id='taskAssignDate' value={(assign_date && format(assign_date)) || ''} />
              </div>
            </div>
          </PopupDatePicker>
        </form>
      </div>
    );
  }
}

export default TaskCreateView;

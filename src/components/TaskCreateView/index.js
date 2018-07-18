/**
 * Created By Clark Zhou.
 *
 * This component is used in multiple scenes:
 *  1. Add Todo task for today
 *  2. Add task for specific project
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'rmc-date-picker';
import moment from 'moment';
import PopupDatePicker from 'rmc-date-picker/lib/Popup';
import Popup from 'rmc-picker/lib/Popup';
import Picker from 'rmc-picker';
import zh_CN from 'rmc-date-picker/lib/locale/zh_CN';

import Header from '../UI/Header';

import Const from '../../base/constants';
import './style.scss';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

let now = new Date();

class TaskCreateView extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    closeView: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    projectId: PropTypes.string
  }

  state = {
    degree: null,
    name: '',
    detail: '',
    status: null,
    project: null,
    deadline: null,
    assign_date: null
  }

  datePicker = (
    <DatePicker
      rootNativeProps={{'data-xx': 'yy'}}
      minDate={Const.date.minDate}
      maxDate={Const.date.maxDate}
      defaultDate={now}
      mode='date'
      locale={zh_CN}
    />
  );

  handleSubmit = () => {
    const { degree, name, detail, deadline, assign_date, project, status } = this.state;
    const { onSubmit, openSnackBar, id, projectId } = this.props;
    let data, formData;
    switch (id) {
      case 'todayTaskCreateView':
        formData = {
          name,
          detail,
          degree,
          project,
          deadline
        };
        data = {
          name,
          detail,
          degree,
          project_id: project ? project.id : null,
          status: 1,
          assign_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          deadline: moment(deadline).format('YYYY-MM-DD HH:mm:ss')
        };
        break;
      case 'projectTaskCreateView':
        formData = {
          name,
          detail,
          degree,
          status,
          deadline,
          assign_date
        };
        data = {
          name,
          detail,
          degree,
          status,
          project_id: projectId,
          assign_date: moment(assign_date).format('YYYY-MM-DD HH:mm:ss'),
          deadline: moment(deadline).format('YYYY-MM-DD HH:mm:ss')
        };
        break;
      default:
        data = {};
        break;
    }

    // validation
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] === '' || formData[key] === null) {
          return openSnackBar(`${key.toUpperCase()} 不能为空`);
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

  onStatusChange = (status) => {
    this.setState({status});
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

  renderStatusPicker = () => {
    const { status } = this.state;
    return (
      <Popup
        transitionName='rmc-picker-popup-slide-fade'
        maskTransitionName='rmc-picker-popup-fade'
        content={
          <Picker
            selectedValue={this.state.status}
            onValueChange={this.onStatusChange}
          >
            {
              Const.task.taskStatusList.slice(0, 2).map((item) => (
                <Picker.Item key={item.key} value={item.key}>
                  {item.value.toUpperCase()}
                </Picker.Item>
              ))
            }
          </Picker>
        }
        title='任务状态'
        onDismiss={this.onProjectPopupDismiss}
      >
        <div className='formField'>
          <div className='inner'>
            <label htmlFor='taskStatus'>Status</label>
            <input type='text' id='taskStatus' name='status' value={status !== null ? Const.task.taskStatus[status] : ''} />
          </div>
        </div>
      </Popup>
    );
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
              Const.task.taskDegreeList.map((item) => (
                <Picker.Item key={item.key} value={item.key}>
                  {item.value.toUpperCase()}
                </Picker.Item>
              ))
            }
          </Picker>
        }
        title='紧急程度'
        onDismiss={this.onProjectPopupDismiss}
      >
        <div className='formField'>
          <div className='inner'>
            <label htmlFor='taskDegree'>Degree</label>
            <input type='text' id='taskDegree' name='degree' value={degree !== null ? Const.task.taskDegree[degree] : ''} />
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

  renderAssignDatePicker = () => {
    const { assign_date } = this.state;
    return (
      <PopupDatePicker
        datePicker={this.datePicker}
        transitionName='rmc-picker-popup-slide-fade'
        maskTransitionName='rmc-picker-popup-fade'
        title='Assign date picker'
        date={assign_date}
        onChange={this.onAssignDateChange}
      >
        <div className='formField'>
          <div className='inner'>
            <label htmlFor='taskAssignDate'>Assign date</label>
            <input
              type='text'
              id='taskAssignDate'
              value={(assign_date && moment(assign_date).format('YYYY-MM-DD')) || ''}
            />
          </div>
        </div>
      </PopupDatePicker>
    );
  }

  render () {
    const { closeView, id } = this.props;
    const { deadline, name, detail } = this.state;
    return (
      <div className='taskFormView'>
        <Header
          largeTitle='添加任务'
          leftIcon={<i className='material-icons'>close</i>}
          rightContent='提交'
          onRightPress={this.handleSubmit}
          onLeftPress={closeView}
        />
        <form className='taskFormView__form'>
          <div className='formField'>
            <div className='inner'>
              <label htmlFor='taskName'>Name</label>
              <input onChange={this.onFormFieldChange} type='text' maxLength='10' id='taskName' name='name' value={name} />
            </div>
          </div>
          <div className='formField'>
            <div className='inner'>
              <label htmlFor='taskDetail'>Detail</label>
              <input onChange={this.onFormFieldChange} type='text' id='taskDetail' name='detail' value={detail} />
            </div>
          </div>
          { this.renderDegreePicker() }
          { id === 'todayTaskCreateView' && this.renderProjectPicker() }
          { id === 'projectTaskCreateView' && this.renderStatusPicker() }
          <PopupDatePicker
            datePicker={this.datePicker}
            transitionName='rmc-picker-popup-slide-fade'
            maskTransitionName='rmc-picker-popup-fade'
            title='Deadline picker'
            date={deadline}
            onChange={this.onDeadlineChange}
          >
            <div className='formField'>
              <div className='inner'>
                <label htmlFor='taskDeadline'>Deadline</label>
                <input type='text' id='taskDeadline' value={(deadline && moment(deadline).format('YYYY-MM-DD')) || ''} />
              </div>
            </div>
          </PopupDatePicker>
          { id === 'projectTaskCreateView' && this.renderAssignDatePicker() }
        </form>
      </div>
    );
  }
}

export default TaskCreateView;

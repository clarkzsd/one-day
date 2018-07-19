import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../../base/constants';
import moment from 'moment';
import classnames from 'classnames';

import './style.scss';

class TaskItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      degree: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.number,
      deadline: PropTypes.string,
      detail: PropTypes.string
    }),
    projectName: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onFinish: PropTypes.func
  }

  state = {
    isSwiped: false,
    isFinished: false
  }

  handleOnEdit = () => {
    const { data, onEdit } = this.props;
    this.setState({isSwiped: false});
    onEdit && onEdit(data);
  }

  handleOnDelete = () => {
    const { data, onDelete } = this.props;
    onDelete && onDelete(data.id);
  }

  handleOnFinish = () => {
    const { data, onFinish } = this.props;
    const update = {
      id: data.id,
      status: 2
    };
    this.setState({ isFinished: true });
    onFinish && onFinish(update);
  }

  handleTouchStart = (e) => {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  handleTouchMove = (e) => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let isSwiped;
    let xUp = e.touches[0].clientX;
    let yUp = e.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      isSwiped = xDiff > 0;
      this.setState({
        isSwiped
      });
    }
  }

  handleMouseDown = (e) => {
    this.xDown = e.clientX;
    this.yDown = e.clientY;
  }

  handleMouseMove = (e) => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let isSwiped;
    let xUp = e.clientX;
    let yUp = e.clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      isSwiped = xDiff > 0;
      this.setState({
        isSwiped
      });
    }
  }

  renderCheckBox () {
    return this.state.isFinished
      ? <span className='taskItem__checkBox taskItem__checkBox--checked'>
        <i className='material-icons'>done</i>
      </span>
      : <span onClick={this.handleOnFinish} className='taskItem__checkBox taskItem__checkBox--unchecked' />;
  }
  render () {
    const { data, projectName } = this.props;
    const { degree, name, status, deadline, detail } = data;
    const { isSwiped, isFinished } = this.state;
    const taskItemCls = classnames({
      'taskItem': true,
      'taskItem--swiped': isSwiped,
      'taskItem--finished': isFinished
    });
    return (
      <div className='taskItem-container'>
        <div
          className={taskItemCls}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}>
          <div className='taskItem__content'>
            <div className='taskItem__header'>
              <span className={`taskItem__statusDot taskItem__statusDot--${Const.task.taskDegree[degree]}`} />
              <span className='taskItem__title'>
                {name}
              </span>
            </div>
            {
              projectName &&
              <div className='taskItem__projectName'>
                <i className='material-icons'>
                  flag
                </i>
                <span>{projectName}</span>
              </div>
            }
            <div className='taskItem__detail'>
              {detail}
            </div>
            <div className='taskItem__dateInfo'>
              <i className='material-icons'>
                calendar_today
              </i>
              <span>Deadline: {moment(deadline).format('L')}</span>
            </div>
          </div>
          {
            status === 1 && this.renderCheckBox()
          }
        </div>
        {
          isSwiped && <ul className='taskItem__actionBtnList'>
            <li>
              <button onClick={this.handleOnEdit} className='taskItem__editBtn'><i className='material-icons'>mode_edit</i></button>
            </li>
            <li>
              <button onClick={this.handleOnDelete} className='taskItem__deleteBtn'><i className='material-icons'>delete</i></button>
            </li>
          </ul>
        }
      </div>
    );
  }
}

export default TaskItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { taskDegree } from '../../base/constants/task';
import moment from 'moment';
import './style.scss';

class TaskItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      degree: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.number,
      deadline: PropTypes.string
    }),
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onFinish: PropTypes.func
  }

  state = {
    isSwiped: false
  }

  handleOnEdit = () => {
    const { data, onEdit } = this.props;
    onEdit && onEdit(data.id);
  }

  handleOnDelete = () => {
    const { data, onDelete } = this.props;
    onDelete && onDelete(data.id);
  }

  handleOnFinish = () => {
    const { data, onFinish } = this.props;
    // Todo
    onFinish && onFinish(data.id);
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
  render () {
    const { data } = this.props;
    const { degree, name, status, deadline } = data;
    const { isSwiped } = this.state;
    return (
      <div className='taskItem-container'>
        <div
          className={`taskItem${isSwiped ? ' taskItem--swiped' : ''}`}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}>
          <div className='taskItem__content'>
            <div className='taskItem__header'>
              <span className={`taskItem__statusDot taskItem__statusDot--${taskDegree[degree]}`} />
              <span className='taskItem__title'>
                {name}
              </span>
            </div>
            <div className='taskItem__detail'>
              blablabla
            </div>
            <div className='taskItem__dateInfo'>
              <i className='material-icons'>
                calendar_today
              </i>
              <span>Deadline: {moment(deadline).format('L')}</span>
            </div>
          </div>
          {
            status === 1 && <span className='taskItem__checkCircle' />
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

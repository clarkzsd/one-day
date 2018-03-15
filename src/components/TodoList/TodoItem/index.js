import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

moment.locale('zh-cn');

const TodoItem = ({ status, title, deadline }) => (
  <div className='todo-item'>
    <div className='inner'>
      <div className='todo-item-content'>
        <div className={`dot ${status}-bg`} />
        <div className='todo-title'>{title}</div>
      </div>
      <span className='todo-deadline'>{moment.unix(deadline).format('L')}</span>
    </div>
  </div>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deadline: PropTypes.number.isRequired
};

export default TodoItem;

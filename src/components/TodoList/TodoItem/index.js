import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

moment.locale('zh-cn');

const TodoItem = ({ status, title }) => (
  <div className='todo-item'>
    <div className='inner'>
      <div className='todo-item-content'>
        <div className={`dot ${status}-bg`} />
        <div className='todo-title'>{title}</div>
      </div>
      <span className='todo-deadline'>{moment().format('L')}</span>
    </div>
  </div>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default TodoItem;

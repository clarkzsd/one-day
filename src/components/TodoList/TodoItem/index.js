import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TodoItem = ({ status, title }) => (
  <div className='todo-item'>
    <div className='inner'>
      <div className={`dot ${status}-bg-color`} />
      <div className='todo-title'>{title}</div>
    </div>
  </div>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default TodoItem;

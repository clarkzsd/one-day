import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TodoListEmpty = ({ placeHolder }) => (
  <div className='empty-indictor'>
    <div className='inner'>
      {placeHolder}
    </div>
  </div>
);

TodoListEmpty.propTypes = {
  placeHolder: PropTypes.string.isRequired
};

export default TodoListEmpty;

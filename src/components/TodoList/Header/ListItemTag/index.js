import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ListItemTag = ({ status }) => (
  <div className='list-item-tag'>
    <h3
      className='task-count'
      style={{
        fontSize: '1.6rem',
        margin: '0'
      }}>24</h3>
    <span className='tag-name'>
      {status}
    </span>
  </div>
);

ListItemTag.propTypes = {
  status: PropTypes.string
};

export default ListItemTag;

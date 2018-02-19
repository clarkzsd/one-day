import React from 'react';
import PropTypes from 'prop-types';

const tagStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  margin: '0.3em'
};

const ListItemTag = ({ status }) => (
  <div style={tagStyle}>
    <h3
      className='task-count'
      style={{
        fontSize: '1.6rem',
        margin: '0'
      }}>24</h3>
    <span className='tag-name' style={{ color: 'rgb(184, 180, 180)' }}>
      {status}
    </span>
  </div>
);

ListItemTag.propTypes = {
  status: PropTypes.string
};

export default ListItemTag;

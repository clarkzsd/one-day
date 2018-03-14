import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const statusList = {
  primary: '重要',
  secondary: '次要',
  urgent: '紧急'
};

const ListItemTag = ({ status }) => (
  <div className='list-item-tag'>
    <h3
      className={`task-count ${status}`}
      style={{
        fontSize: '1.6rem',
        margin: '0'
      }}>24</h3>
    <span className='tag-name'>
      {statusList[status]}
    </span>
  </div>
);

ListItemTag.propTypes = {
  status: PropTypes.string
};

export default ListItemTag;

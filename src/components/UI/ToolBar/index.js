import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ToolBar = ({ left, right, title }) => (
  <header className='tool-bar'>
    <div className='inner'>
      <button className='left-btn'>
        {left}
      </button>
      <div className='screen-title'>{title}</div>
      { right && <button className='right-btn'>{right}</button> }
    </div>
  </header>
);

ToolBar.propTypes = {
  left: PropTypes.object.isRequired,
  right: PropTypes.object,
  title: PropTypes.string
};

export default ToolBar;

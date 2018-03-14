import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ToolBar = ({ left, right, title, onLeftPress }) => (
  <header className='tool-bar'>
    <div className='inner'>
      <button className='left-btn' onClick={onLeftPress}>
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
  title: PropTypes.string,
  onLeftPress: PropTypes.func
};

export default ToolBar;

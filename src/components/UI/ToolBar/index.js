import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ToolBar = ({ left, right, title, onLeftPress, style, titleStyle }) => (
  <header className='tool-bar' style={style}>
    <div className='inner'>
      <button className='left-btn' onClick={onLeftPress}>
        {left}
      </button>
      <div className='screen-title'>
        <span className='screen-title-content' style={titleStyle}>
          {title}
        </span>
      </div>
      {
        right
          ? <button className='left-btn' onClick={onLeftPress}>{left}</button>
          : <div className='left-btn' style={{ width: '24px', height: '24px' }} />
      }
    </div>
  </header>
);

ToolBar.propTypes = {
  left: PropTypes.object.isRequired,
  right: PropTypes.object,
  title: PropTypes.string,
  onLeftPress: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object
};

export default ToolBar;

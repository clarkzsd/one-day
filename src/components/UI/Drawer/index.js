import React from 'react';
import PropTypes from 'prop-types';
import ToolBar from '../ToolBar';
import './style.scss';

const Drawer = ({ isOpen, onClosePress }) => (
  <div className={`drawer${isOpen ? ' slide-in' : ''}`}>
    <ToolBar
      left={<i className='material-icons' style={{ color: '#03A9F4' }}>close</i>}
      onLeftPress={onClosePress}
    />
    <div className='drawer-content'>
      <div className='menu-item'>
        <div className='inner'>
          <i className='material-icons'>person</i>
          <span className='menu-item-content'>登录</span>
        </div>
      </div>
    </div>
    <footer>
      <div className='inner'>
        <span className='sync-status'>未同步</span>
        <span className='about'>关于</span>
      </div>
    </footer>
  </div>
);

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired
};

export default Drawer;

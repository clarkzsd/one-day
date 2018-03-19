import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className='menu-item'>
        <Link to='/' onClick={onClosePress}>
          <div className='inner'>
            <i className='material-icons'>wb_sunny</i>
            <span className='menu-item-content'>我的一天</span>
          </div>
        </Link>
      </div>
      <div className='menu-item'>
        <Link to='/archieve' onClick={onClosePress}>
          <div className='inner'>
            <i className='material-icons'>event_available</i>
            <span className='menu-item-content'>完成事项</span>
          </div>
        </Link>
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

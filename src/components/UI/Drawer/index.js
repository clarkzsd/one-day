import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../../store';
import { openNotification } from '../../../actions/ui';
import PropTypes from 'prop-types';
import ToolBar from '../ToolBar';
import AboutModal from '../../AboutModal';
import './style.scss';

class Drawer extends Component {
  state = {
    isModalOpen: false
  }
  handleModalOpen = () => {
    this.props.onClosePress();
    this.setState({isModalOpen: true});
  }
  handleLoginPress = () => {
    this.props.onClosePress();
    store.dispatch(openNotification('仍在开发中😂'));
  }
  render () {
    const { isOpen, onClosePress } = this.props;
    return (
      <div className={`drawer${isOpen ? ' slide-in' : ''}`}>
        <ToolBar
          left={<i className='material-icons' style={{ color: '#03A9F4' }}>close</i>}
          onLeftPress={onClosePress}
        />
        <div className='drawer-content'>
          <div className='menu-item' onClick={this.handleLoginPress}>
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
            <Link to='/archive' onClick={onClosePress}>
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
            <button className='about' onClick={this.handleModalOpen}>关于</button>
          </div>
        </footer>
        { this.state.isModalOpen && <AboutModal handleCancel={() => this.setState({isModalOpen: false})} /> }
      </div>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired
};

export default Drawer;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDrawer } from '../../../components/action';
import ToolBar from '../ToolBar';
import AboutModal from '../../AboutModal';
import './style.scss';

class Drawer extends Component {
  state = {
    isModalOpen: false
  }
  handleModalOpen = () => {
    this.props.closeDrawer();
    this.setState({isModalOpen: true});
  }
  handleLoginPress = () => {
    this.props.closeDrawer();
    this.props.openSnackBar('还在开发中。。。');
  }
  render () {
    const { isDrawerOpen, closeDrawer } = this.props;
    return (
      <div className={`drawer${isDrawerOpen ? ' slide-in' : ''}`}>
        <ToolBar
          left={<i className='material-icons' style={{ color: '#03A9F4' }}>close</i>}
          onLeftPress={closeDrawer}
        />
        <div className='drawer-content'>
          <div className='menu-item'>
            <Link to='/login' onClick={closeDrawer}>
              <div className='inner'>
                <i className='material-icons'>person</i>
                <span className='menu-item-content'>登录</span>
              </div>
            </Link>
          </div>
          <div className='menu-item'>
            <Link to='/' onClick={closeDrawer}>
              <div className='inner'>
                <i className='material-icons'>wb_sunny</i>
                <span className='menu-item-content'>我的一天</span>
              </div>
            </Link>
          </div>
          <div className='menu-item'>
            <Link to='/archive' onClick={closeDrawer}>
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

const mapStateToProps = ({ ui }) => {
  return {
    isDrawerOpen: ui.drawer.isOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer())
  };
};

Drawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  openSnackBar: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

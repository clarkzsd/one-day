import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolBar from '../../../UI/ToolBar';
import ListItemTag from '../ListItemTag';
import './style.scss';

class Header extends Component {
  render () {
    const { onToolBarLeftPress } = this.props;
    return (
      <section
        className='app-header'
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 50%)',
          backgroundColor: '#03A9F4'
        }}>
        <ToolBar
          left={<i className='material-icons'>menu</i>}
          onLeftPress={onToolBarLeftPress}
        />
        <main className='list-info'>
          <div className='inner'>
            <h1 className='list-name'>
              我的一天
            </h1>
            <div className='list-item-tags'>
              <ListItemTag status='urgent' />
              <ListItemTag status='primary' />
              <ListItemTag status='secondary' />
            </div>
          </div>
        </main>
        <footer>
          <div className='inner'>
            <span className='list-date'>{moment().format('L')}</span>
            <span>
                已完成 50%
            </span>
          </div>
        </footer>
      </section>
    );
  }
}

Header.propTypes = {
  onToolBarLeftPress: PropTypes.func.isRequired
};

export default Header;

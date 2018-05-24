import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolBar from '../../../UI/ToolBar';
import ListItemTag from '../ListItemTag';
import './style.scss';

class Header extends Component {
  render () {
    const { onToolBarLeftPress, urgentCount, primaryCount, secondaryCount, percentage } = this.props;
    return (
      <section className='app-header'>
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
              <ListItemTag status='urgent' count={urgentCount} />
              <ListItemTag status='primary' count={primaryCount} />
              <ListItemTag status='secondary' count={secondaryCount} />
            </div>
          </div>
        </main>
        <footer>
          <div className='inner'>
            <span className='list-date'>{moment().format('L')}</span>
            <span>
                已完成 {percentage}%
            </span>
          </div>
        </footer>
        <div className='layer' style={{ width: `${100 - percentage}%` }} />
      </section>
    );
  }
}

Header.propTypes = {
  onToolBarLeftPress: PropTypes.func.isRequired,
  urgentCount: PropTypes.number.isRequired,
  secondaryCount: PropTypes.number.isRequired,
  primaryCount: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired
};

export default Header;

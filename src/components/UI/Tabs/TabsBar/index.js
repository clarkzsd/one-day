import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class TabsBar extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    onTabsBarClick: PropTypes.func,
    activeKey: PropTypes.string
  }

  renderTabsBarContent () {
    const { tabs, onTabsBarClick, activeKey } = this.props;
    return tabs.map((item, index) => {
      const { tabTitle, panelKey } = item.props;
      return (
        <li
          className={`tabs__barItem${panelKey === activeKey ? ' tabs__barItem--active' : ''}`}
          key={`tabs__bar-${index}`}
          onClick={(e) => onTabsBarClick(panelKey)}
        >
          <span>{tabTitle}</span>
        </li>
      );
    });
  }

  render () {
    return (
      <div className='tabs__bar'>
        <div className='inner'>
          <ul>
            {this.renderTabsBarContent()}
          </ul>
        </div>
      </div>
    );
  }
}

export default TabsBar;

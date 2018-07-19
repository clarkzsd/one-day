import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class TabsPanel extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
    activeKey: PropTypes.string,
    panelKey: PropTypes.string
  }
  render () {
    const { activeKey, panelKey, children } = this.props;
    return (
      <div className={`tabs__panel${panelKey === activeKey ? ' tabs__panel--active' : ''}`}>
        {children}
      </div>
    );
  }
}

export default TabsPanel;

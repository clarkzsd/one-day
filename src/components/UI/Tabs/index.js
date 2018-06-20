import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import TabsBar from './TabsBar';
import TabsPanel from './TabsPanel';

class Tabs extends Component {
  static propTypes = {
    defaultActiveKey: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
    onTabClick: PropTypes.func
  }

  state = {
    activeKey: this.props.defaultActiveKey
  }

  onTabsBarClick = (panelKey) => {
    const { onTabClick } = this.props;
    this.setState({activeKey: panelKey});
    onTabClick && onTabClick(panelKey);
  }

  render () {
    const { children } = this.props;
    const { activeKey } = this.state;
    const panelKeys = children.map((item, index) => {
      return item.props.panelKey;
    });
    return (
      <div className='tabs'>
        <TabsBar
          tabs={children}
          activeKey={activeKey}
          panelKeys={panelKeys}
          onTabsBarClick={this.onTabsBarClick} />
        <div className='tabs__panels'>
          <div className='inner'>
            {
              children.map((child, idx) => {
                return cloneElement(child, {activeKey: activeKey});
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Tabs.TabsPanel = TabsPanel;

export default Tabs;

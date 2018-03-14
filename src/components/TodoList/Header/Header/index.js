import React, { Component } from 'react';
import ToolBar from '../../../UI/ToolBar/index';
import ListItemTag from '../ListItemTag/index';
import './style.scss';

class Header extends Component {
  render () {
    return (
      <section
        className='app-header'
        style={{
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 50%)',
          backgroundColor: '#03A9F4'
        }}>
        <ToolBar
          left={<i className='material-icons'>menu</i>}
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
            <span className='list-date'>Feb 18, 2018</span>
            <span>
                已完成 50%
            </span>
          </div>
        </footer>
      </section>
    );
  }
}

export default Header;

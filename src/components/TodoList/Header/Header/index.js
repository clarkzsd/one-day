import React, { Component } from 'react';
import ToolBar from '../ToolBar/index';
import ListItemTag from '../ListItemTag/index';
import './style.scss';

class Header extends Component {
  render () {
    return (
      <section className='app-header'>
        <ToolBar />
        <main className='list-info'>
          <div className='inner'>
            <h1 className='list-name'>
              我的一天
            </h1>
            <div className='list-item-tags'>
              <ListItemTag status='紧急' />
              <ListItemTag status='次要' />
              <ListItemTag status='主要' />
            </div>
          </div>
        </main>
        <footer>
          <div className='inner'>
            <span className='list-date'>Feb 18, 2018</span>
            <span>
              <span>50%</span>
                  已完成 50%
            </span>
          </div>
        </footer>
      </section>
    );
  }
}

export default Header;

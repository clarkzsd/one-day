import React, { Component } from 'react';
import ToolBar from './ToolBar';

class Header extends Component {
  render () {
    return (
      <section className='app-header'>
        <ToolBar />
      </section>
    );
  }
}

export default Header;

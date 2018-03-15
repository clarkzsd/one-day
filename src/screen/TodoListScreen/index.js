import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../../components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from '../../components/TodoList';
import FloatingButton from '../../components/UI/FloatingButton';
import Drawer from '../../components/UI/Drawer';
import './style.scss';

const list = [
  {
    key: 1,
    title: '完成设计稿',
    status: 'urgent'
  },
  {
    key: 2,
    title: '制作 Header',
    status: 'secondary'
  }, {
    key: 3,
    title: '写《三块广告牌》的影评',
    status: 'urgent'
  }, {
    key: 4,
    title: '整理主屏',
    status: 'primary'
  }
];

class TodoListScreen extends Component {
  state = {
    isDrawerOpen: false
  }
  onPressCreate = () => {
    this.props.history.push('/create');
  }
  onToggleDrawer = () => {
    this.setState({
      isDrawerOpen: true
    });
  }
  handleDrawerClose = () => {
    this.setState({
      isDrawerOpen: false
    });
  }
  render () {
    return (
      <div className='todolist-screen'>
        <Header
          onToolBarLeftPress={this.onToggleDrawer}
        />
        <div className='top' style={{ height: '250px' }} />
        <main className='todolist-content'>
          <SectionTitle name='代办' />
          <TodoList list={list} />
          <SectionTitle name='已完成' count={5} />
          <TodoList list={list} />
        </main>
        <Drawer
          isOpen={this.state.isDrawerOpen}
          onClosePress={this.handleDrawerClose}
        />
        <FloatingButton icon='add' onPress={this.onPressCreate} />
      </div>
    );
  }
}

TodoListScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(TodoListScreen);

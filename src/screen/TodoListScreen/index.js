import React, { Component } from 'react';
import Header from '../../components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from '../../components/TodoList';
import FloatingButton from '../../components/UI/FloatingButton';

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
  render () {
    return (
      <div className='todolist-screen'>
        <Header />
        <div className='top' style={{ height: '250px' }} />
        <main className='todolist-content'>
          <SectionTitle name='代办' />
          <TodoList list={list} />
          <SectionTitle name='已完成' count={5} />
          <TodoList isFinished={false} list={list} />
        </main>
        <FloatingButton icon='add' />
      </div>
    );
  }
}

export default TodoListScreen;

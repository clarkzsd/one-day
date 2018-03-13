import React, { Component } from 'react';
import Header from '../../components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from '../../components/TodoList';

class TodoListScreen extends Component {
  render () {
    return (
      <div>
        <Header />
        <SectionTitle name='代办' />
        <TodoList />
        <SectionTitle name='已完成' />
      </div>
    );
  }
}

export default TodoListScreen;

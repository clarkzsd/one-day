import React, { Component } from 'react';
import Header from '../../components/TodoList/Header';
import TodoList from '../../components/TodoList';

class TodoListScreen extends Component {
  render () {
    return (
      <div>
        <Header />
        <TodoList />
      </div>
    );
  }
}

export default TodoListScreen;

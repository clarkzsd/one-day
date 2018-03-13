import React, { Component } from 'react';
import TodoItem from '../TodoItem';

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
  }
];

class TodoList extends Component {
  render () {
    return (
      <div>
        {
          list.map((item) => (
            <TodoItem {...item} />
          ))
        }
      </div>
    );
  }
}

export default TodoList;

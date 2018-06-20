import React, { Component } from 'react';
import TodoItem from '../TodoItem';
import PropTypes from 'prop-types';

class TodoList extends Component {
  render () {
    const { todos, onDeleteItem, onFinishItem, onEditItem } = this.props;
    return (
      <div>
        {
          todos.map((todo) => (
            <TodoItem
              data={todo}
              onFinish={onFinishItem}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              key={todo.id}
            />
          ))
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onFinishItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
};

export default TodoList;

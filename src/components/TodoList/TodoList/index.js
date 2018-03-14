import React, { Component } from 'react';
import TodoItem from '../TodoItem';
import PropTypes from 'prop-types';

class TodoList extends Component {
  render () {
    const { list } = this.props;
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

TodoList.propTypes = {
  list: PropTypes.array.isRequired
};

export default TodoList;

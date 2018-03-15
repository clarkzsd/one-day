import * as types from './types';

export const createTodo = (todo) => {
  return {
    type: types.CREATE_TODO,
    payload: todo
  };
};

export const fetchTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  return {
    type: types.FETCH_TODOS,
    payload: todos
  };
};

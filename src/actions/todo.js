import * as types from './types';

export const createTODO = (todo) => {
  return {
    type: types.CREATE_TODO,
    payload: todo
  };
};

export const fetchTodos = () => {
  const todos = localStorage.getItem('todos');
  return {
    type: types.FETCH_TODOS,
    payload: todos
  };
};

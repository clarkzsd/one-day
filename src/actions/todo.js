import * as types from './types';

export const createTodo = (todo) => {
  return {
    type: types.CREATE_TODO,
    payload: todo
  };
};

export const editTodo = (todo) => {
  return {
    type: types.EDIT_TODO,
    payload: todo
  };
};

export const deleteTodo = (todoID) => {
  return {
    type: types.DELETE_TODO,
    payload: todoID
  };
};

import * as types from './types';

export const createTodo = (todo) => {
  return {
    type: types.CREATE_TODO,
    payload: todo
  };
};

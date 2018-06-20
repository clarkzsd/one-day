import callAPI from '../../base/api';

export const FETCH_TODAY_TODOS_REQUEST = 'FETCH_TODAY_TODOS_REQUEST';
export const FETCH_TODAY_TODOS_SUCCEEDED = 'FETCH_TODAY_TODOS_SUCCEEDED';
export const FETCH_TODAY_TODOS_FAILED = 'FETCH_TODAY_TODOS_FAILED';
export const fetchTodayTodos = () => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_TODAY_TODOS_REQUEST});
    callAPI('get', '/api/todos').then(
      response => dispatch({type: FETCH_TODAY_TODOS_SUCCEEDED, payload: response.data}),
      error => dispatch({type: FETCH_TODAY_TODOS_FAILED, error})
    );
  };
};

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';
export const fetchProjects = () => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_PROJECTS_REQUEST});
    callAPI('get', '/api/projects').then(
      response => dispatch({type: FETCH_PROJECTS_SUCCEEDED, payload: response.data}),
      error => dispatch({type: FETCH_PROJECTS_FAILED, error})
    );
  };
};

export const CREATE_TODO = 'CREATE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const createTodo = (todo) => {
  return {
    type: CREATE_TODO,
    payload: todo
  };
};

export const editTodo = (todo) => {
  return {
    type: EDIT_TODO,
    payload: todo
  };
};

export const deleteTodo = (todoID) => {
  return {
    type: DELETE_TODO,
    payload: todoID
  };
};

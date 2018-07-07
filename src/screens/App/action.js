import callAPI from '../../base/api';
import { OPEN_SNACKBAR } from '../../components/action';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';
export const fetchProjects = () => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_PROJECTS_REQUEST});
    return callAPI('get', '/api/projects').then(
      response => dispatch({type: FETCH_PROJECTS_SUCCEEDED, payload: response.data}),
      error => dispatch({type: FETCH_PROJECTS_FAILED, error})
    );
  };
};

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED';
export const DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';
export const deleteTask = (id) => {
  return (dispatch, getState) => {
    dispatch({type: DELETE_TASK_REQUEST});
    callAPI('delete', `/api/todos/${id}`).then(
      (response) => {
        dispatch({type: DELETE_TASK_SUCCEEDED, id});
        dispatch({type: OPEN_SNACKBAR, payload: '删除成功'});
      },
      error => dispatch({type: FETCH_PROJECTS_FAILED, error})
    );
  };
};

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCEEDED = 'UPDATE_TASK_SUCCEEDED';
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';
export const updateTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_TASK_REQUEST});
    callAPI('put', `/api/todos`, task).then(
      response => dispatch({type: OPEN_SNACKBAR, payload: '完成任务！👍'}),
      error => dispatch({type: UPDATE_TASK_FAILED, error})
    );
  };
};

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';
export const createTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: CREATE_TASK_REQUEST});
    callAPI('post', `/api/todos`, task).then(
      (response) => {
        const newTask = {
          ...task,
          id: response.data.id
        };
        dispatch({type: CREATE_TASK_SUCCEEDED, payload: newTask});
        dispatch({type: OPEN_SNACKBAR, payload: '创建成功'});
      },
      error => dispatch({type: CREATE_TASK_FAILED, error})
    );
  };
};

import callAPI from '../../base/api';
import { OPEN_SNACKBAR } from '../../components/action';

export const FETCH_TODAY_TODOS_REQUEST = 'FETCH_TODAY_TODOS_REQUEST';
export const FETCH_TODAY_TODOS_SUCCEEDED = 'FETCH_TODAY_TODOS_SUCCEEDED';
export const FETCH_TODAY_TODOS_FAILED = 'FETCH_TODAY_TODOS_FAILED';
export const fetchTodayTodos = () => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_TODAY_TODOS_REQUEST});
    return callAPI('get', '/api/todos').then(
      response => dispatch({type: FETCH_TODAY_TODOS_SUCCEEDED, payload: response.data}),
      error => dispatch({type: FETCH_TODAY_TODOS_FAILED, error})
    );
  };
};

export const UPDATE_TODAY_TASK_REQUEST = 'UPDATE_TODAY_TASK_REQUEST';
export const UPDATE_TODAY_TASK_SUCCEEDED = 'UPDATE_TODAY_TASK_SUCCEEDED';
export const UPDATE_TODAY_TASK_FAILED = 'UPDATE_TODAY_TASK_FAILED';
export const updateTodayTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: UPDATE_TODAY_TASK_REQUEST});
    return callAPI('put', `/api/todos`, task).then(
      response => {
        dispatch({type: UPDATE_TODAY_TASK_SUCCEEDED, payload: task});
        dispatch({type: OPEN_SNACKBAR, payload: '操作成功👍'});
      },
      error => {
        dispatch({type: UPDATE_TODAY_TASK_FAILED, error});
        dispatch({type: OPEN_SNACKBAR, payload: '操作失败😭'});
        throw error;
      }
    );
  };
};

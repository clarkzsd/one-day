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

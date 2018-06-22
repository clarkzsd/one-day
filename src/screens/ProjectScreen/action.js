import callAPI from '../../base/api';

export const FETCH_PROJECT_TASKS_REQUEST = 'FETCH_PROJECT_TASK_REQUEST';
export const FETCH_PROJECT_TASKS_SUCCEEDED = 'FETCH_PROJECT_TASK_SUCCEEDED';
export const FETCH_PROJECT_TASKS_FAILED = 'FETCH_PROJECT_TASK_FAILED';
export const fetchProjectTasks = (projectId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROJECT_TASKS_REQUEST
    });
    callAPI('get', `/api/todos?project_id=${projectId}`).then(
      response => dispatch({
        type: FETCH_PROJECT_TASKS_SUCCEEDED,
        payload: response.data
      }),
      error => dispatch({
        type: FETCH_PROJECT_TASKS_FAILED, error
      })
    );
  };
};

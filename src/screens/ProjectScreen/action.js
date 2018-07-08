import callAPI from '../../base/api';
import { OPEN_SNACKBAR } from '../../components/action';

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

export const CREATE_PROJECT_TASK_REQUEST = 'CREATE_PROJECT_TASK_REQUEST';
export const CREATE_PROJECT_TASK_SUCCEEDED = 'CREATE_PROJECT_TASK_SUCCEEDED';
export const CREATE_PROJECT_TASK_FAILED = 'CREATE_PROJECT_TASK_FAILED';
export const createProjectTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: CREATE_PROJECT_TASK_REQUEST});
    return callAPI('post', `/api/todos`, task).then(
      (response) => {
        const newTask = {
          ...task,
          id: response.data.id
        };
        dispatch({type: CREATE_PROJECT_TASK_SUCCEEDED, payload: newTask});
        dispatch({type: OPEN_SNACKBAR, payload: '创建成功'});
      },
      error => dispatch({type: CREATE_PROJECT_TASK_FAILED, error})
    );
  };
};

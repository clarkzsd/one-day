import * as types from './action';
import * as appActionTypes from '../App/action';
import { updateObjectInArray } from '../../base/utils/immutable';

const INITIAL_STATE = {
  tasks: {
    data: [],
    loading: false
  }
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_PROJECT_TASKS_REQUEST:
      return {
        ...state,
        tasks: {
          data: [],
          loading: false
        }
      };
    case types.FETCH_PROJECT_TASKS_SUCCEEDED:
      return {
        ...state,
        tasks: {
          data: action.payload,
          loading: false
        }
      };
    case appActionTypes.DELETE_TASK_SUCCEEDED:
      const updates = state.tasks.data.filter(item => item.id !== action.id);
      return {
        ...state,
        tasks: {
          data: updates,
          loading: false
        }
      };
    case types.CREATE_PROJECT_TASK_REQUEST:
      return {
        ...state,
        tasks: {
          data: state.tasks.data,
          loading: true
        }
      };
    case types.CREATE_PROJECT_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: {
          data: state.tasks.data.concat([action.payload]),
          loading: false
        }
      };
    case types.UPDATE_PROJECT_TASK_REQUEST:
      return {
        ...state,
        tasks: {
          data: state.tasks.data,
          loading: true
        }
      };
    case types.UPDATE_PROJECT_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: {
          data: updateObjectInArray(state.tasks.data, 'id', action),
          loading: false
        }
      };
    default:
      return state;
  }
};

export default projectReducer;

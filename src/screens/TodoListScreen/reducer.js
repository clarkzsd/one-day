import * as types from './action';
import * as appActionTypes from '../App/action';
import { updateObjectInArray } from '../../base/utils/immutable';

const INITIAL_STATE = {
  todos: {
    data: [],
    loading: true
  }
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_TODAY_TODOS_REQUEST:
      return {
        ...state,
        todos: {
          data: state.todos.data,
          loading: true
        }
      };
    case types.FETCH_TODAY_TODOS_SUCCEEDED:
      return {
        ...state,
        todos: {
          data: action.payload,
          loading: false
        }
      };
    case appActionTypes.DELETE_TASK_SUCCEEDED:
      const updates = state.todos.data.filter(item => item.id !== action.id);
      return updates.length === state.todos.data ? state : {
        ...state,
        todos: {
          data: updates,
          loading: false
        }
      };
    case appActionTypes.CREATE_TASK_REQUEST:
      return {
        ...state,
        todos: {
          data: state.todos.data,
          loading: true
        }
      };
    case appActionTypes.CREATE_TASK_SUCCEEDED:
      return {
        ...state,
        todos: {
          data: state.todos.data.concat([action.payload]),
          loading: false
        }
      };
    case types.UPDATE_TODAY_TASK_REQUEST:
      return {
        ...state,
        todos: {
          data: state.todos.data,
          loading: true
        }
      };
    case types.UPDATE_TODAY_TASK_SUCCEEDED:
      return {
        ...state,
        todos: {
          data: updateObjectInArray(state.todos.data, 'id', action),
          loading: false
        }
      };
    default:
      return state;
  }
};

export default homeReducer;

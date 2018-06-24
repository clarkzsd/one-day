import * as types from './action';
import * as appActionTypes from '../App/action';

const INITIAL_STATE = {
  todos: {
    data: [],
    loading: false
  },
  projects: {
    data: [],
    loading: false
  }
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_TODAY_TODOS_REQUEST:
      return {
        ...state,
        todos: {
          data: [],
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
    case types.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        projects: {
          data: [],
          loading: true
        }
      };
    case types.FETCH_PROJECTS_SUCCEEDED:
      return {
        ...state,
        projects: {
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
    default:
      return state;
  }
};

export default homeReducer;

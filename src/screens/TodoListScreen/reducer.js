import * as types from './action';
import * as appActionTypes from '../App/action';

const INITIAL_STATE = {
  todos: {
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
    default:
      return state;
  }
};

export default homeReducer;

import * as types from '../actions/types';
import { loadTodoList } from '../utils/localStorage';

const INITIAL_STATE = {
  todos: {
    data: loadTodoList()
  },
  snackBar: {
    isTriggered: false,
    message: ''
  }
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_TODO:
      return {
        ...state,
        todos: {
          data: state.todos.data.concat([action.payload])
        }
      };
    case types.EDIT_TODO:
      return {
        ...state,
        todos: {
          data: state.todos.data.map((item) => {
            if (item.id !== action.payload.id) {
              return item;
            }
            return {
              ...item,
              ...action.payload
            };
          })
        }
      };
    case types.DELETE_TODO:
      return {
        ...state,
        todos: {
          data: state.todos.data.filter(item => item.id !== action.payload)
        }
      };
    case types.TRIGGER_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isTriggered: true,
          message: action.payload
        }
      };
    case types.UNTRIGGER_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isTriggered: false,
          message: ''
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

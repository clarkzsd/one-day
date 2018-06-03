import * as types from '../actions/types';
import { loadTodoList } from '../utils/localStorage';

const INITIAL_STATE = {
  todos: {
    data: loadTodoList()
  },
  snackBar: {
    isOpen: false,
    message: ''
  },
  modal: {
    isTriggered: false,
    editingTodo: {
      title: '',
      status: '',
      deadline: null,
      finishedAt: null
    }
  },
  drawer: {
    isOpen: false
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
    case types.OPEN_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isOpen: true,
          message: action.payload
        }
      };
    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        snackBar: {
          isOpen: false,
          message: ''
        }
      };
    case types.TRIGGER_MODAL:
      return {
        ...state,
        modal: {
          isTriggered: true,
          editingTodo: action.payload
        }
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isTriggered: false,
          editingTodo: {}
        }
      };
    case types.OPEN_DRAWER:
      return {
        ...state,
        drawer: {
          isOpen: true
        }
      };
    case types.CLOSE_DRAWER:
      return {
        ...state,
        drawer: {
          isOpen: false
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

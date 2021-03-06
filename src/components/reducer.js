import * as types from './action';

const INITIAL_STATE = {
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

const UIReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

export default UIReducer;

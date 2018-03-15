import * as types from '../actions/types';

const INITIAL_STATE = {
  todos: {
    data: []
  }
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_TODOS:
      return {
        ...state,
        todos: {
          data: action.payload || []
        }
      };
    case types.CREATE_TODO:
      return {
        ...state,
        todos: {
          data: state.todos.data.concat([action.payload])
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

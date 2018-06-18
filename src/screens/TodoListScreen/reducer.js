import * as types from './action';

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
    default:
      return state;
  }
};

export default homeReducer;

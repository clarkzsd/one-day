import * as types from './action';

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
    default:
      return state;
  }
};

export default projectReducer;

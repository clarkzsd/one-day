import * as types from './action';

const INITIAL_STATE = {
  projects: {
    data: [],
    loading: false
  }
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        projects: {
          data: state.projects.data,
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
    case types.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        projects: {
          data: state.projects.data,
          loading: true
        }
      };
    case types.CREATE_PROJECT_SUCCEEDED:
      return {
        ...state,
        projects: {
          data: state.projects.data.concat([action.payload]),
          loading: false
        }
      };
    default:
      return state;
  }
};

export default appReducer;

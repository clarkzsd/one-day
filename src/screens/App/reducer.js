import * as types from './action';
import * as projectTypes from '../ProjectScreen/action';
import { updateObjectInArray } from '../../base/utils/immutable';

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
    case projectTypes.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        projects: {
          data: state.projects.data,
          loading: true
        }
      };
    case projectTypes.UPDATE_PROJECT_SUCCEEDED:
      return {
        ...state,
        projects: {
          data: updateObjectInArray(state.projects.data, 'id', action),
          loading: false
        }
      };
    case projectTypes.DELETE_PROJECT_REQUEST:
      return {
        ...state,
        projects: {
          data: state.projects.data,
          loading: true
        }
      };
    case projectTypes.DELETE_PROJECT_SUCCEEDED:
      const updates = state.projects.data.filter(item => item.id !== action.id);
      return {
        ...state,
        projects: {
          data: updates,
          loading: false
        }
      };
    default:
      return state;
  }
};

export default appReducer;

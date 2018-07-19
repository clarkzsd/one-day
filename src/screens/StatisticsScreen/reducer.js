import * as types from './action';

const INITIAL_STATE = {
  today: {
    data: {},
    loading: true
  },
  week: {
    data: {},
    loading: true
  }
};

const statisticsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_STATISTICS_REQUEST:
      return {
        ...state,
        [action.time]: {
          data: state[action.time].data,
          loading: true
        }
      };
    case types.FETCH_STATISTICS_SUCCEEDED:
      return {
        ...state,
        [action.time]: {
          data: action.payload,
          loading: false
        }
      };
    default:
      return state;
  }
};

export default statisticsReducer;

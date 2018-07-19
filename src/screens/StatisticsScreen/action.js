import callAPI from '../../base/api';

export const FETCH_STATISTICS_REQUEST = 'FETCH_STATISTICS_REQUEST';
export const FETCH_STATISTICS_SUCCEEDED = 'FETCH_STATISTICS_SUCCEEDED';
export const FETCH_STATISTICS_FAILED = 'FETCH_STATISTICS_FAILED';
export const fetchStatistics = (type) => {
  return (dispatch, getState) => {
    dispatch({type: FETCH_STATISTICS_REQUEST, time: type});
    return callAPI('get', `/api/statistics?type=${type}`).then(
      (response) => {
        dispatch({type: FETCH_STATISTICS_SUCCEEDED, time: type, payload: response.data});
      },
      error => dispatch({type: FETCH_STATISTICS_FAILED, error})
    );
  };
};

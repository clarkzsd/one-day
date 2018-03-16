import * as types from './types';

export const openNotification = (message) => {
  return dispatch => {
    dispatch(triggerSnackBar(message));
    setTimeout(() => {
      dispatch(unTriggerSnackBar());
    }, 3500);
  };
};

export const triggerSnackBar = (message) => {
  return {
    type: types.TRIGGER_SNACKBAR,
    payload: message
  };
};

export const unTriggerSnackBar = () => {
  return {
    type: types.UNTRIGGER_SNACKBAR
  };
};

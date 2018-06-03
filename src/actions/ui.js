import * as types from './types';

export const openSnackBar = (message) => {
  return {
    type: types.OPEN_SNACKBAR,
    payload: message
  };
};

export const closeSnackBar = () => {
  return {
    type: types.CLOSE_SNACKBAR
  };
};

export const triggerModal = (todo) => {
  return {
    type: types.TRIGGER_MODAL,
    payload: todo
  };
};

export const closeModal = () => {
  return {
    type: types.CLOSE_MODAL
  };
};

export const openDrawer = () => {
  return {
    type: types.OPEN_DRAWER
  };
};

export const closeDrawer = () => {
  return {
    type: types.CLOSE_DRAWER
  };
};

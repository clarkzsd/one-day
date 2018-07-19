export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const openSnackBar = (message) => {
  return {
    type: OPEN_SNACKBAR,
    payload: message
  };
};
export const closeSnackBar = () => {
  return {
    type: CLOSE_SNACKBAR
  };
};

export const TRIGGER_MODAL = 'TRIGGER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const triggerModal = (todo) => {
  return {
    type: TRIGGER_MODAL,
    payload: todo
  };
};
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const openDrawer = () => {
  return {
    type: OPEN_DRAWER
  };
};
export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER
  };
};

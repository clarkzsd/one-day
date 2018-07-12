import callAPI from '../../base/api';
import { OPEN_SNACKBAR } from '../../components/action';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCEEDED = 'USER_LOGIN_SUCCEEDED';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const userLogin = (userInfo) => {
  return (dispatch, getState) => {
    dispatch({type: USER_LOGIN});
    return callAPI('post', `/api/login`, userInfo).then(
      response => {
        const currentUser = response.data.user;
        dispatch({type: USER_LOGIN_SUCCEEDED, payload: currentUser});
        dispatch({type: OPEN_SNACKBAR, payload: '登录成功😄'});
      },
      error => {
        dispatch({type: USER_LOGIN_FAILED, error});
        dispatch({type: OPEN_SNACKBAR, payload: '用户名或密码错误😭'});
        throw error;
      }
    );
  };
};

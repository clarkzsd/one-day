import Cookie from 'js-cookie';

const isLogin = () => {
  return Cookie.get('tk');
};

const logOut = () => {
  Cookie.remove('tk');
};

export {
  isLogin,
  logOut
};

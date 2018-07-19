import Cookie from 'js-cookie';

const isLogin = () => {
  return Cookie.get('tk') && Cookie.get('tk.sig');
};

const logOut = () => {
  Cookie.remove('tk');
};

export {
  isLogin,
  logOut
};

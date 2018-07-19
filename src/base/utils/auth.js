import Cookie from 'js-cookie';

const isLogin = () => {
  return Cookie.get('tk.sig');
};

export {
  isLogin
};

import axios from 'axios';
import config from '../config';

const serverUrl = `${config.protocol}://${config.host}:${config.port}`;

const callAPI = (method, url, data = {}, timeout = 8000) => {
  return axios({
    url: serverUrl + url,
    timeout,
    data,
    method,
    withCredentials: true
  }).then((response) => {
    return response;
  }).catch((err) => {
    console.error(`API Error:\nCode: ${err.response.status}\nMessage: ${err.message}`);
    if (err.response.status === 401) {
      window.location.href = '/';
      return;
    }
    throw err;
  });
};

export default callAPI;

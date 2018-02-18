import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './normalize.css';
import './global.css';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(App);

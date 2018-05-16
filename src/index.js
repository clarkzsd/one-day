import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './normalize.css';
import './global.scss';

const render = Component => {
  ReactDOM.hydrate(
    <Component />,
    document.getElementById('app')
  );
};

render(App);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/normalize.css';
import './styles/global.scss';

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );
};

render(App);

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import store from '../store';
import AppRoute from '../AppRoute';

class App extends Component {
  componentDidMount () {
    const body = document.querySelector('body');
    const spinner = document.getElementById('loading-spinner');
    body.removeChild(spinner);
  }
  render () {
    return (
      <Provider store={store}>
        <AppRoute />
      </Provider>
    );
  }
}

export default hot(module)(App);

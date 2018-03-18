import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import store from '../store';
import AppRoute from '../AppRoute';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppRoute />
      </Provider>
    );
  }
}

export default hot(module)(App);

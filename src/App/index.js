import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createStoreWithInitialState } from '../store';
import AppRoute from '../AppRoute';

class App extends Component {
  componentDidMount () {
    // Remove loading spinner
    const body = document.querySelector('body');
    const spinner = document.getElementById('loading-spinner');
    body.removeChild(spinner);

    // iOS10+ Safari viewport zooming hack
    // Docs: https://webkit.org/blog/7367/new-interaction-behaviors-in-ios-10/
    document.addEventListener('touchmove', (event) => {
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, false);
  }
  render () {
    return (
      <Provider store={createStoreWithInitialState(window.REDUX_DATA)}>
        <AppRoute />
      </Provider>
    );
  }
}

export default hot(module)(App);

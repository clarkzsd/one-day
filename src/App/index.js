import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { AnimatedSwitch } from 'react-router-transition';
import store from '../store';
import TodoListScreen from '../screen/TodoListScreen';
import CreateTodoScreen from '../screen/CreateTodoScreen';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          >
            <Route exact path='/' component={TodoListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
          </AnimatedSwitch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);

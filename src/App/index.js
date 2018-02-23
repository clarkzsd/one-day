import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Header from '../Header';
import TodoList from '../TodoList';
import FloatingButton from '../FloatingButton';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={TodoList} />
          </Switch>
          <FloatingButton icon='add' />
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);

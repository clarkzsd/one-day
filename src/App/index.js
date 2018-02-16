import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import TodoList from '../TodoList';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={TodoList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoListScreen from '../screen/TodoListScreen';
import CreateTodoScreen from '../screen/CreateTodoScreen';
import './style.scss';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames='fade'
                timeout={300}
              >
                <Switch location={location}>
                  <Route exact path='/' component={TodoListScreen} />
                  <Route exact path='/create' component={CreateTodoScreen} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);

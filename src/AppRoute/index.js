import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import ArchiveListScreen from '../screens/ArchiveListScreen';
import SnackBar from '../components/UI/SnackBar';
import Drawer from '../components/UI/Drawer';

class AppRoute extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={TodoListScreen} />
            <Route exact path='/archive' component={ArchiveListScreen} />
            <Route exact path='/create' component={CreateTodoScreen} />
          </Switch>
          <SnackBar />
          <Drawer />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRoute;

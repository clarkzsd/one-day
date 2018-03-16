import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from '../../components/TodoList';
import FloatingButton from '../../components/UI/FloatingButton';
import Drawer from '../../components/UI/Drawer';
import { fetchTodos } from '../../actions/todo';
import TodoListEmpty from '../../components/TodoList/TodoListEmpty';
import './style.scss';

class TodoListScreen extends Component {
  state = {
    isDrawerOpen: false
  }
  componentDidMount () {
    // const todos = [
    //   {
    //     key: 1,
    //     title: '洗碗',
    //     status: 'primary',
    //     deadline: 1521114266
    //   }, {
    //     key: 2,
    //     title: '整理主屏',
    //     status: 'primary',
    //     deadline: 1521514266
    //   }, {
    //     key: 3,
    //     title: '制作 Header',
    //     status: 'secondary',
    //     deadline: 1524114266
    //   }, {
    //     key: 4,
    //     title: '写《三块广告牌》的影评',
    //     status: 'urgent',
    //     deadline: 1511514266
    //   }, {
    //     key: 5,
    //     title: '看《湮灭》',
    //     status: 'finished',
    //     deadline: 1511512266
    //   }
    // ];
    // localStorage.setItem('todos', JSON.stringify(todos));
    this.props.fetchTodos();
  }
  onPressCreate = () => {
    this.props.history.push('/create');
  }
  onToggleDrawer = () => {
    this.setState({
      isDrawerOpen: true
    });
  }
  handleDrawerClose = () => {
    this.setState({
      isDrawerOpen: false
    });
  }
  renderTodoList = (list) => {
    return list && list.length ? <TodoList list={list} /> : <TodoListEmpty />;
  }
  renderFinishedList = (list) => {
    return list && list.length ? <TodoList list={list} /> : '';
  }
  render () {
    const todoList = this.props.todos.data;
    const finished = todoList.filter((item) => item.status === 'finished');
    const unfinished = todoList.filter((item) => item.status !== 'finished');
    const percentage = todoList.length > 0 ? Math.round((finished.length / todoList.length) * 100) : 100;
    return (
      <div className='todolist-screen'>
        <Header
          onToolBarLeftPress={this.onToggleDrawer}
          urgentCount={todoList.filter((item) => item.status === 'urgent').length}
          primaryCount={todoList.filter((item) => item.status === 'primary').length}
          secondaryCount={todoList.filter((item) => item.status === 'secondary').length}
          percentage={percentage}
        />
        <div className='top' style={{ height: '250px' }} />
        <main className='todolist-content'>
          <SectionTitle name='代办' />
          {this.renderTodoList(unfinished)}
          <SectionTitle name='已完成' count={finished.length} />
          {this.renderFinishedList(finished)}
        </main>
        <Drawer
          isOpen={this.state.isDrawerOpen}
          onClosePress={this.handleDrawerClose}
        />
        <FloatingButton icon='add' onPress={this.onPressCreate} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(fetchTodos())
  };
};

TodoListScreen.propTypes = {
  history: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  fetchTodos: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

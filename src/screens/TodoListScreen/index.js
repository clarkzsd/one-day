import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from './components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from './components/TodoList';
import FloatingButton from '../../components/UI/FloatingButton';
import TodoListEmpty from './components/TodoList/TodoListEmpty';
import EditTodoModal from '../../components/EditTodoModal';

import {
  fetchTodayTodos,
  fetchProjects,
  deleteTodo,
  editTodo
} from './action';
import { openDrawer } from '../../components/action';

import './style.scss';

class TodoListScreen extends Component {
  state = {
    isModalOpen: false,
    editingTodo: {
      title: '',
      status: '',
      deadline: null,
      finishedAt: null
    }
  }

  componentDidMount () {
    const { fetchTodayTodos, fetchProjects } = this.props;
    Promise.all([
      fetchTodayTodos(),
      fetchProjects()
    ]);
  }

  onPressCreate = () => {
    this.props.history.push('/create');
  }

  handleFinishItem = (todo) => {
    this.props.editTodo(todo);
  }

  handleDeleteItem = (id) => {
    this.props.deleteTodo(id);
  }

  handleSubmitEditingForm = (todo) => {
    this.props.editTodo(todo);
    this.setState({isModalOpen: false});
  }

  handleCancelEditing = () => {
    this.setState({isModalOpen: false});
  }

  handleEditItem = (todo) => {
    this.setState({isModalOpen: true, editingTodo: todo});
  }

  renderTaskList = (todos) => {
    return <TodoList
      todos={todos}
      onDeleteItem={this.handleDeleteItem}
      onFinishItem={this.handleFinishItem}
      onEditItem={this.handleEditItem}
    />;
  }

  renderTodoList = (list) => {
    return list && list.length ? this.renderTaskList(list) : <TodoListEmpty placeHolder='戳右下角按钮，开启你的一天~' />;
  }

  renderFinishedList = (list) => {
    return list && list.length ? this.renderTaskList(list) : '';
  }

  render () {
    const { todoListLength, finishedList, unfinishedList } = this.props;
    const percentage = todoListLength > 0 ? Math.round((finishedList.length / todoListLength) * 100) : 100;
    return (
      <div className='todolist-screen'>
        <Header
          onToolBarLeftPress={this.props.openDrawer}
          urgentCount={unfinishedList.filter((item) => item.status === 'urgent').length}
          primaryCount={unfinishedList.filter((item) => item.status === 'primary').length}
          secondaryCount={unfinishedList.filter((item) => item.status === 'secondary').length}
          percentage={percentage}
        />
        <div className='top' style={{ height: '250px' }} />
        <main className='todolist-content'>
          <SectionTitle name='代办' />
          {this.renderTodoList(unfinishedList)}
          <SectionTitle name='已完成' count={finishedList.length} />
          {this.renderFinishedList(finishedList)}
        </main>
        <FloatingButton icon={<i className='material-icons'>add</i>} onPress={this.onPressCreate} />
        { this.state.isModalOpen &&
          <EditTodoModal
            onCancel={this.handleCancelEditing}
            onSubmitForm={this.handleSubmitEditingForm}
            editingTodo={this.state.editingTodo}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => {
  const todayList = home.todos.data.filter((item) => item.finishedAt === null || moment().diff(moment.unix(item.finishedAt), 'days') <= 0);
  return {
    todoListLength: todayList.length,
    finishedList: todayList.filter((item) => item.status === 'finished'),
    unfinishedList: todayList.filter((item) => item.status !== 'finished')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodayTodos: () => dispatch(fetchTodayTodos()),
    fetchProjects: () => dispatch(fetchProjects()),
    openDrawer: () => dispatch(openDrawer()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    editTodo: (todo) => dispatch(editTodo(todo))
  };
};

TodoListScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  todoListLength: PropTypes.number.isRequired,
  finishedList: PropTypes.array.isRequired,
  unfinishedList: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  fetchTodayTodos: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

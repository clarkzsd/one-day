import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/TodoList/Header';
import SectionTitle from '../../components/UI/SectionTitle';
import TodoList from '../../components/TodoList';
import FloatingButton from '../../components/UI/FloatingButton';
import { fetchTodos } from '../../actions/todo';
import { openDrawer } from '../../actions/ui';
import TodoListEmpty from '../../components/TodoList/TodoListEmpty';
import './style.scss';

class TodoListScreen extends Component {
  onPressCreate = () => {
    this.props.history.push('/create');
  }
  renderTodoList = (list) => {
    return list && list.length ? <TodoList list={list} /> : <TodoListEmpty placeHolder='找点事儿做吧' />;
  }
  renderFinishedList = (list) => {
    return list && list.length ? <TodoList list={list} /> : '';
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
        <FloatingButton icon='add' onPress={this.onPressCreate} />
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => {
  const todayList = todos.data.filter((item) => item.finishedAt === null || moment().diff(moment.unix(item.finishedAt), 'days') <= 0);
  return {
    todoListLength: todayList.length,
    finishedList: todayList.filter((item) => item.status === 'finished'),
    unfinishedList: todayList.filter((item) => item.status !== 'finished')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    openDrawer: () => dispatch(openDrawer())
  };
};

TodoListScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  todoListLength: PropTypes.number.isRequired,
  finishedList: PropTypes.array.isRequired,
  unfinishedList: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

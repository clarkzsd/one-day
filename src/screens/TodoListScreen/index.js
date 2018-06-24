import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FloatingButton from '../../components/UI/FloatingButton';
import EditTodoModal from '../../components/EditTodoModal';
import TaskItem from '../../components/TaskItem';
import Header from '../../components/UI/Header';
import Tabs from '../../components/UI/Tabs';

import { fetchTodayTodos } from './action';
import { fetchProjects, deleteTask, finishTask } from '../App/action';
import { openDrawer } from '../../components/action';

import { todayTaskStatusList } from '../../base/constants/task';

import './style.scss';

const TabsPanel = Tabs.TabsPanel;

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

  handleFinishTask = (id) => {
    // TODO
    this.props.finishTask(id);
  }

  handleDeleteTask = (id) => {
    this.props.deleteTask(id);
  }

  handleEditTask = (todo) => {
    // this.setState({isModalOpen: true, editingTodo: todo});
  }

  handleSubmitEditingForm = (todo) => {
    // this.props.editTodo(todo);
    this.setState({isModalOpen: false});
  }

  handleCancelEditing = () => {
    this.setState({isModalOpen: false});
  }

  renderTasksList = (statusKey) => {
    const tasks = this.props.todayTodosData.data;
    const selectedTasks = tasks.filter(task => task.status === statusKey);
    if (statusKey === 1 && selectedTasks.length === 0) {
      return <span className='todayContainer__todoList--empty'>
        戳右下角按钮，开启你的一天~
      </span>;
    }
    return selectedTasks.map((task) => {
      return <TaskItem
        data={task}
        key={task.id}
        onEdit={this.handleEditTask}
        onFinish={this.handleFinishTask}
        onDelete={this.handleDeleteTask}
      />;
    });
  }

  render () {
    const { openDrawer } = this.props;
    return (
      <div className='todayContainer'>
        <Header
          largeTitle='Today'
          leftIcon={<i className='material-icons'>menu</i>}
          onLeftPress={openDrawer}
        />
        <Tabs defaultActiveKey='0'>
          {
            todayTaskStatusList.map((item, index) => {
              const { value } = item;
              return (
                <TabsPanel
                  key={index}
                  panelKey={`${index}`}
                  tabTitle={value.toUpperCase()}>
                  {this.renderTasksList(item.key)}
                </TabsPanel>
              );
            })
          }
        </Tabs>
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
  return {
    todayTodosData: home.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodayTodos: () => dispatch(fetchTodayTodos()),
    fetchProjects: () => dispatch(fetchProjects()),
    openDrawer: () => dispatch(openDrawer()),
    deleteTask: (id) => dispatch(deleteTask(id)),
    finishTask: (id) => dispatch(finishTask(id))
  };
};

TodoListScreen.propTypes = {
  todayTodosData: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  fetchTodayTodos: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  finishTask: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

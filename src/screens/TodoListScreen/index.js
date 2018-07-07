import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import FloatingButton from '../../components/UI/FloatingButton';
import EditTodoModal from '../../components/EditTodoModal';
import TaskCreateView from '../../components/TaskCreateView';
import TaskItem from '../../components/TaskItem';
import Header from '../../components/UI/Header';
import Tabs from '../../components/UI/Tabs';

import { fetchTodayTodos } from './action';
import { fetchProjects, deleteTask, updateTask, createTask } from '../App/action';
import { openDrawer, openSnackBar } from '../../components/action';

import { todayTaskStatusList } from '../../base/constants/task';

import './style.scss';

const TabsPanel = Tabs.TabsPanel;

class TodoListScreen extends Component {
  state = {
    isModalOpen: false,
    isCreateViewOpen: false,
    editingTodo: {
      title: '',
      status: '',
      deadline: null,
      finishedAt: null
    }
  }

  componentDidMount () {
    const { fetchTodayTodos, fetchProjects } = this.props;
    fetchProjects().then(() => fetchTodayTodos());
  }

  getProjectName = (id) => {
    const { projectsData } = this.props;
    let { name } = projectsData.data.find(item => item.id === id);
    return name;
  }

  onPressCreate = () => {
    this.setState({isCreateViewOpen: true});
  }

  handleCreateTask = (task) => {
    this.props.createTask(task);
    this.setState({isCreateViewOpen: false});
  }

  handleFinishTask = (task) => {
    this.props.updateTask(task);
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

  handleCloseView = () => {
    this.setState({isCreateViewOpen: false});
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
      const projectName = this.getProjectName(task.project_id);
      return <TaskItem
        data={task}
        key={task.id}
        projectName={projectName}
        onEdit={this.handleEditTask}
        onFinish={this.handleFinishTask}
        onDelete={this.handleDeleteTask}
      />;
    });
  }

  render () {
    const { openDrawer, projectsData, openSnackBar } = this.props;
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
        <CSSTransition
          in={this.state.isCreateViewOpen}
          timeout={300}
          classNames='taskCreateView'
          unmountOnExit
        >
          {state => (
            <TaskCreateView
              id='todayTaskCreateView'
              closeView={this.handleCloseView}
              projects={projectsData.data}
              onSubmit={this.handleCreateTask}
              openSnackBar={openSnackBar}
            />
          )}
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = ({ home, app }) => {
  return {
    todayTodosData: home.todos,
    projectsData: app.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodayTodos: () => dispatch(fetchTodayTodos()),
    fetchProjects: () => dispatch(fetchProjects()),
    openDrawer: () => dispatch(openDrawer()),
    deleteTask: (id) => dispatch(deleteTask(id)),
    updateTask: (task) => dispatch(updateTask(task)),
    createTask: (task) => dispatch(createTask(task)),
    openSnackBar: (msg) => dispatch(openSnackBar(msg))
  };
};

TodoListScreen.propTypes = {
  todayTodosData: PropTypes.object.isRequired,
  projectsData: PropTypes.object.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openSnackBar: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  fetchTodayTodos: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

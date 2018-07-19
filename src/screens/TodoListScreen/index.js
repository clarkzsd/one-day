import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import FloatingButton from '../../components/UI/FloatingButton';
import TaskCreateView from '../../components/TaskCreateView';
import TaskEditView from '../../components/TaskEditView';
import TaskItem from '../../components/TaskItem';
import Header from '../../components/UI/Header';
import Tabs from '../../components/UI/Tabs';

import { fetchTodayTodos, updateTodayTask } from './action';
import { fetchProjects, deleteTask, createTask, finishTask } from '../App/action';
import { openDrawer, openSnackBar } from '../../components/action';

import Const from '../../base/constants';

import './style.scss';

const TabsPanel = Tabs.TabsPanel;

class TodoListScreen extends Component {
  state = {
    isCreateViewOpen: false,
    isEditViewOpen: false,
    editingTask: null
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

  handleEditTask = (task) => {
    this.setState({
      isEditViewOpen: true,
      editingTask: task
    });
  }

  handleCreateTask = (task) => {
    this.props.createTask(task).then(() => this.handleCloseView('createView'));
  }

  handleUpdateTask = (task) => {
    this.props.updateTodayTask(task).then(() => this.handleCloseView('editView'));
  }

  handleFinishTask = (task) => {
    this.props.finishTask(task);
  }

  handleDeleteTask = (id) => {
    this.props.deleteTask(id);
  }

  handleCloseView = (viewType) => {
    switch (viewType) {
      case 'createView':
        this.setState({isCreateViewOpen: false});
        break;
      case 'editView':
        this.setState({isEditViewOpen: false});
        break;
      default:
        break;
    }
  }

  renderTasksList = (statusKey) => {
    const { todayTodosData } = this.props;
    if (todayTodosData.loading) {
      return <span className='todayContainer__todoList--empty'>
        loading……
      </span>;
    }
    const tasks = todayTodosData.data;
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
            Const.task.todayTaskStatusList.map((item, index) => {
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
        <CSSTransition
          in={this.state.isCreateViewOpen}
          timeout={300}
          classNames='taskFormView'
          unmountOnExit
        >
          {state => (
            <TaskCreateView
              id='todayTaskCreateView'
              closeView={() => this.handleCloseView('createView')}
              projects={projectsData.data}
              onSubmit={this.handleCreateTask}
              openSnackBar={openSnackBar}
            />
          )}
        </CSSTransition>
        <CSSTransition
          in={this.state.isEditViewOpen}
          timeout={300}
          classNames='taskFormView'
          unmountOnExit
        >
          {state => (
            <TaskEditView
              id='todayTaskEditView'
              task={this.state.editingTask}
              closeView={() => this.handleCloseView('editView')}
              projects={projectsData.data}
              onSubmit={this.handleUpdateTask}
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
    updateTodayTask: (task) => dispatch(updateTodayTask(task)),
    finishTask: (task) => dispatch(finishTask(task)),
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
  finishTask: PropTypes.func.isRequired,
  updateTodayTask: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListScreen));

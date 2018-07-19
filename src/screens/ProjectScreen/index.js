import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// component
import Header from '../../components/UI/Header';
import Modal from '../../components/UI/Modal';
import FloatingButton from '../../components/UI/FloatingButton';
import Tabs from '../../components/UI/Tabs';
import TaskCreateView from '../../components/TaskCreateView';
import TaskEditView from '../../components/TaskEditView';
import TaskItem from '../../components/TaskItem';

// action
import { openDrawer, openSnackBar } from '../../components/action';
import { deleteTask, finishTask } from '../App/action';
import {
  fetchProjectTasks,
  createProjectTask,
  updateProjectTask,
  updateProject,
  deleteProject,
  fetchCurrentProject
} from './action';

import Const from '../../base/constants';
import './style.scss';

const TabsPanel = Tabs.TabsPanel;

class ProjectScreen extends Component {
  static propTypes = {
    history: PropTypes.object,
    openDrawer: PropTypes.func,
    fetchProjectTasks: PropTypes.func,
    match: PropTypes.object,
    location: PropTypes.object,
    tasksData: PropTypes.object,
    projectsData: PropTypes.object.isRequired,
    currentProject: PropTypes.object.isRequired,
    deleteTask: PropTypes.func,
    openSnackBar: PropTypes.func.isRequired,
    createProjectTask: PropTypes.func.isRequired,
    finishTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    fetchCurrentProject: PropTypes.func.isRequired
  }

  state = {
    isCreateViewOpen: false,
    isEditViewOpen: false,
    isProjectModalOpen: false,
    projectNameForEditing: this.props.location.state.projectName,
    editingTask: null
  }

  componentDidMount () {
    const { fetchProjectTasks, match, fetchCurrentProject } = this.props;
    fetchCurrentProject(match.params.id).then(() => fetchProjectTasks(match.params.id));
  }

  componentDidUpdate (prevProps) {
    const { fetchProjectTasks, match, fetchCurrentProject, currentProject } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      fetchCurrentProject(match.params.id).then(() => fetchProjectTasks(match.params.id));
    } else if (currentProject.data.name !== prevProps.currentProject.data.name) {
      fetchCurrentProject(match.params.id);
    }
  }

  handleCreateTask = (task) => {
    this.props.createProjectTask(task).then(() => this.handleCloseView('createView'));
  }

  handleUpdateTask = (task) => {
    this.props.updateProjectTask(task).then(() => this.handleCloseView('editView'));
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

  handlePressCreate = () => {
    this.setState({isCreateViewOpen: true});
  }

  handleDeleteTask = (id) => {
    this.props.deleteTask(id);
  }

  handleEditTask = (task) => {
    this.setState({
      isEditViewOpen: true,
      editingTask: task
    });
  }

  handleFinishTask = (task) => {
    this.props.finishTask(task);
  }

  handleProjectNameChange = (e) => {
    this.setState({projectNameForEditing: e.target.value});
  }

  handleCloseModal = () => {
    this.setState({isProjectModalOpen: false});
  }

  handleSaveProjectChange = () => {
    const { match, updateProject } = this.props;
    const data = {
      id: Number(match.params.id),
      name: this.state.projectNameForEditing
    };
    updateProject(data).then(() => this.handleCloseModal());
  }

  handleDeleteProject = () => {
    const { deleteProject, currentProject, history } = this.props;
    deleteProject(currentProject.data.id).then(() => history.push('/'));
  }

  openProjectEditModal = () => {
    this.setState({isProjectModalOpen: true});
  }

  renderTasksList = (statusKey) => {
    const tasks = this.props.tasksData.data;
    return tasks.filter(task => task.status === statusKey)
      .map((task) => {
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
    const { openDrawer, openSnackBar, projectsData, currentProject, match } = this.props;
    const projectName = currentProject.data.name;
    return (
      <div className='projectContainer'>
        <Header
          largeTitle={projectName || 'Project'}
          leftIcon={<i className='material-icons'>menu</i>}
          rightContent={<i className='material-icons'>edit</i>}
          onRightPress={this.openProjectEditModal}
          onLeftPress={openDrawer}
        />
        <Tabs defaultActiveKey='0'>
          {
            Const.task.taskStatusList.map((item, index) => {
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
        <FloatingButton icon={<i className='material-icons'>add</i>} onPress={this.handlePressCreate} />
        <CSSTransition
          in={this.state.isCreateViewOpen}
          timeout={300}
          classNames='taskFormView'
          unmountOnExit
        >
          {state => (
            <TaskCreateView
              id='projectTaskCreateView'
              closeView={() => this.handleCloseView('createView')}
              projects={projectsData.data}
              projectId={match.params.id}
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
        {
          this.state.isProjectModalOpen &&
          <Modal
            title='编辑任务'
            onModalClose={this.handleCloseModal}
            footer={[
              <button key='save' onClick={this.handleSaveProjectChange}>保存</button>,
              <button key='delete' onClick={this.handleDeleteProject} style={{ color: '#E91E63' }}>删除任务</button>
            ]}
          >
            <div className='formField'>
              <label htmlFor='projectName'>项目名称</label>
              <input type='text' id='projectName' name='projectName' value={this.state.projectNameForEditing} onChange={this.handleProjectNameChange} />
            </div>
          </Modal>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    openSnackBar: (msg) => dispatch(openSnackBar(msg)),
    createProjectTask: (task) => dispatch(createProjectTask(task)),
    updateProjectTask: (task) => dispatch(updateProjectTask(task)),
    finishTask: (task) => dispatch(finishTask(task)),
    updateProject: (project) => dispatch(updateProject(project)),
    fetchCurrentProject: (id) => dispatch(fetchCurrentProject(id)),
    deleteProject: (id) => dispatch(deleteProject(id))
  };
};

const mapStateToProps = ({ project, app }) => {
  return {
    tasksData: project.tasks,
    currentProject: project.currentProject,
    projectsData: app.projects
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectScreen));

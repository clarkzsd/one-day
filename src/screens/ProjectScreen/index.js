import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// component
import TaskCreateView from '../../components/TaskCreateView';
import Header from '../../components/UI/Header';
import FloatingButton from '../../components/UI/FloatingButton';
import Tabs from '../../components/UI/Tabs';
import TaskItem from '../../components/TaskItem';

// action
import { openDrawer, openSnackBar } from '../../components/action';
import { deleteTask, updateTask } from '../App/action';
import { fetchProjectTasks, createProjectTask } from './action';

import { taskStatusList } from '../../base/constants/task';
import './style.scss';

const TabsPanel = Tabs.TabsPanel;

class ProjectScreen extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    fetchProjectTasks: PropTypes.func,
    match: PropTypes.object,
    location: PropTypes.object,
    tasksData: PropTypes.object,
    deleteTask: PropTypes.func,
    openSnackBar: PropTypes.func.isRequired,
    createProjectTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    projectsData: PropTypes.object.isRequired
  }

  state = {
    isCreateViewOpen: false
  }

  componentDidMount () {
    const { fetchProjectTasks, match } = this.props;
    fetchProjectTasks(match.params.id);
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchProjectTasks((this.props.match.params.id));
    }
  }

  handleCreateTask = (task) => {
    this.props.createProjectTask(task).then(() => this.handleCloseView());
  }

  handleCloseView = () => {
    this.setState({isCreateViewOpen: false});
  }

  handlePressCreate = () => {
    this.setState({isCreateViewOpen: true});
  }

  handleDeleteTask = (id) => {
    this.props.deleteTask(id);
  }

  handleEditTask = () => {
    // TODO
  }

  handleFinishTask = (task) => {
    this.props.updateTask(task);
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
    const { openDrawer, location, openSnackBar, projectsData, match } = this.props;
    const projectName = location.state.projectName;
    return (
      <div className='projectContainer'>
        <Header
          largeTitle={projectName}
          leftIcon={<i className='material-icons'>menu</i>}
          onLeftPress={openDrawer}
        />
        <Tabs defaultActiveKey='0'>
          {
            taskStatusList.map((item, index) => {
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
          classNames='taskCreateView'
          unmountOnExit
        >
          {state => (
            <TaskCreateView
              id='projectTaskCreateView'
              closeView={this.handleCloseView}
              projects={projectsData.data}
              projectId={match.params.id}
              onSubmit={this.handleCreateTask}
              openSnackBar={openSnackBar}
            />
          )}
        </CSSTransition>
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
    updateTask: (task) => dispatch(updateTask(task))
  };
};

const mapStateToProps = ({ project, app }) => {
  return {
    tasksData: project.tasks,
    projectsData: app.projects
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);

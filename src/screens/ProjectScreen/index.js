import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/UI/Header';
import FloatingButton from '../../components/UI/FloatingButton';
import Tabs from '../../components/UI/Tabs';
import TaskItem from '../../components/TaskItem';

import { openDrawer } from '../../components/action';
import { fetchProjectTasks } from './action';

import { taskStatusList } from '../../base/constants/task';
import './style.scss';

const TabsPanel = Tabs.TabsPanel;

class ProjectScreen extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    fetchProjectTasks: PropTypes.func,
    match: PropTypes.object,
    location: PropTypes.object,
    tasksData: PropTypes.object
  }

  componentDidMount () {
    const { fetchProjectTasks, match } = this.props;
    fetchProjectTasks(match.params.id);
  }

  handlePressCreate = () => {
    // TODO
  }

  renderTasksList = (statusKey) => {
    const tasks = this.props.tasksData.data;
    return tasks.filter(task => task.status === statusKey)
      .map((task) => {
        return <TaskItem data={task} key={task.id} />;
      });
  }

  render () {
    const { openDrawer, location } = this.props;
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId))
  };
};

const mapStateToProps = ({ project }) => {
  return {
    tasksData: project.tasks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);

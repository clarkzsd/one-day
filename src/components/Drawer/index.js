import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AboutModal from '../AboutModal';

import { closeDrawer } from '../action';
import { createProject } from '../../screens/App/action';
import { isLogin } from '../../base/utils/auth';
import { getData } from '../../base/utils/localStorage';

import './style.scss';

class Drawer extends Component {
  constructor (props) {
    super(props);
    this.newProjectInput = null;
    this.setNewProjectInputRef = ele => {
      this.newProjectInput = ele;
    };
  }

  state = {
    isModalOpen: false,
    isNewProjectAdding: false,
    newProjectName: ''
  }

  componentDidMount () {
    document.addEventListener('mouseup', this.handleMouseUp, false);
  }

  componentDidUpdate (prevProps) {
    if (this.newProjectInput) {
      this.newProjectInput.focus();
    }

    document.addEventListener('mouseup', this.handleMouseUp, false);
  }

  handleMouseUp = (e) => {
    if (!e.target.id.includes('newProject') && this.state.isNewProjectAdding) {
      this.setState({
        isNewProjectAdding: false,
        newProjectName: ''
      });
      document.removeEventListener('mouseup', this.handleMouseUp, false);
    }
  }

  handleCreateProject = (e) => {
    const { newProjectName } = this.state;
    let data;
    if (e.keyCode === 13) {
      data = {
        name: newProjectName
      };
      this.props.createProject(data).then(() => this.setState({
        isNewProjectAdding: false,
        newProjectName: ''
      }));
    }
  }

  handleModalOpen = () => {
    this.props.closeDrawer();
    this.setState({isModalOpen: true});
  }

  handleNewProjectChange = (e) => {
    this.setState({newProjectName: e.target.value});
  }

  handleAddProjectBtnClick = () => {
    this.setState({isNewProjectAdding: true});
  }

  renderProjectList = () => {
    const { projectsData, closeDrawer } = this.props;
    const { isNewProjectAdding, newProjectName } = this.state;
    const { data } = projectsData;
    const list = data.map((item) =>
      <div className='menu-item' key={item.id}>
        <Link to={{
          pathname: `/projects/${item.id}`,
          state: {projectName: item.name}
        }} onClick={closeDrawer}>
          <div className='inner'>
            <span className='drawer__emojiIcon'>🏁</span>
            <span className='menu-item-content'>{item.name}</span>
          </div>
        </Link>
      </div>
    );
    if (isNewProjectAdding) {
      list.push(
        <div className='menu-item drawer__newProject' id='newProject' key='new-item'>
          <div className='inner' id='newProject__inner'>
            <span className='drawer__emojiIcon' id='newProject__emojiIcon'>🏁</span>
            <input
              id='newProjectInput'
              ref={this.setNewProjectInputRef}
              className='menu-item-content'
              value={newProjectName}
              placeholder='New Project'
              onChange={this.handleNewProjectChange}
              onKeyDown={this.handleCreateProject}
            />
          </div>
        </div>
      );
    }
    return list;
  }

  render () {
    const { isDrawerOpen, closeDrawer } = this.props;
    const currentUser = getData('currentUser');
    return (
      <div className={`drawer${isDrawerOpen ? ' slide-in' : ''}`}>
        <div className='drawer__header'>
          <div className='inner'>
            <button className='header__btn--left' onClick={closeDrawer}>
              <i className='material-icons'>close</i>
            </button>
            <button className='header__btn--right' onClick={closeDrawer}>
              <i className='material-icons'>exit_to_app</i>
            </button>
          </div>
        </div>
        <div className='drawer-content'>
          <div className='menu-item drawer__user-info'>
            {
              isLogin() ? <div className='inner'>
                <span className='drawer__emojiIcon'>👋</span>
                <span className='menu-item-content'>Hi, {currentUser.username}</span>
              </div>
                : <Link to='/login' onClick={closeDrawer}>
                  <div className='inner'>
                    <i className='material-icons'>person</i>
                    <span className='menu-item-content'>登录</span>
                  </div>
                </Link>
            }
          </div>
          <div className='drawer__subtitle'>
            <div className='inner'>
              <span>
                Overview
              </span>
            </div>
          </div>
          <div className='menu-item'>
            <Link to='/' onClick={closeDrawer}>
              <div className='inner'>
                <i className='material-icons'>wb_sunny</i>
                <span className='menu-item-content'>我的一天</span>
              </div>
            </Link>
          </div>
          <div className='menu-item'>
            <Link to='/statistics' onClick={closeDrawer}>
              <div className='inner'>
                <i className='material-icons'>waves</i>
                <span className='menu-item-content'>数据统计</span>
              </div>
            </Link>
          </div>
          <div className='drawer__subtitle'>
            <div className='inner'>
              <span>
                Projects
              </span>
            </div>
          </div>
          {this.renderProjectList()}
        </div>
        <footer>
          <div className='inner'>
            <button className='drawer__addProjectBtn' onClick={this.handleAddProjectBtnClick}>
              <i className='material-icons'>add</i>
            </button>
            <button className='about' onClick={this.handleModalOpen}>关于</button>
          </div>
        </footer>
        { this.state.isModalOpen && <AboutModal handleCancel={() => this.setState({isModalOpen: false})} /> }
      </div>
    );
  }
}

const mapStateToProps = ({ ui, app }) => {
  return {
    isDrawerOpen: ui.drawer.isOpen,
    projectsData: app.projects
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    createProject: (project) => dispatch(createProject(project))
  };
};

Drawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  projectsData: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

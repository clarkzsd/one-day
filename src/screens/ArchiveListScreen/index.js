import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { openDrawer } from '../../actions/ui';
import ToolBar from '../../components/UI/ToolBar';
import TodoList from '../../components/TodoList';
import TodoListEmpty from '../../components/TodoList/TodoListEmpty';

class ArchiveListScreen extends Component {
  render () {
    const { openDrawer, archivedList } = this.props;
    return (
      <div className='archive-list-screen'>
        <ToolBar
          left={<i className='material-icons'>menu</i>}
          onLeftPress={openDrawer}
          title='完成事项'
          titleStyle={{
            color: '#fff'
          }}
          style={{
            position: 'fixed',
            top: '0',
            width: '100%',
            backgroundColor: '#03A9F4',
            boxShadow: '0 2px 5px rgba(0,0,0,.26)'
          }}
        />
        <div className='top' style={{ height: '56px' }} />
        <main>
          {
            archivedList && archivedList.length ? <TodoList list={archivedList} /> : <TodoListEmpty placeHolder='过去已完成的任务事项会出现在这里~' />
          }
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
};

const mapStateToProps = ({ todos }) => {
  return {
    archivedList: todos.data.filter((item) => item.status === 'finished' && moment().diff(moment.unix(item.finishedAt), 'days') > 0)
  };
};

ArchiveListScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  archivedList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveListScreen);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { openDrawer } from '../../actions/ui';
import ToolBar from '../../components/UI/ToolBar';
import TodoList from '../../components/TodoList';
import TodoListEmpty from '../../components/TodoList/TodoListEmpty';

class ArchieveListScreen extends Component {
  render () {
    const { openDrawer, archievedList } = this.props;
    return (
      <div className='archieve-list-screen'>
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
            archievedList && archievedList.length ? <TodoList list={archievedList} /> : <TodoListEmpty placeHolder='过去已完成的任务事项会出现在这里~' />
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
    archievedList: todos.data.filter((item) => item.status === 'finished' && moment(item.finishedAt).diff(moment().unix(), 'hours') >= 24)
  };
};

ArchieveListScreen.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  archievedList: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchieveListScreen);

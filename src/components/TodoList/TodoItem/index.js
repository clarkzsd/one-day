import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { editTodo, deleteTodo } from '../../../actions/todo';
import { openNotification, triggerModal } from '../../../actions/ui';
import './style.scss';

moment.locale('zh-cn');

const TodoItem = ({
  id,
  status,
  title,
  deadline,
  editTodo,
  deleteTodo,
  openNotification,
  triggerModal
}) => {
  const onDonePress = () => {
    const newTodo = {
      id,
      status: 'finished',
      title,
      deadline,
      finishedAt: moment().unix()
    };
    try {
      editTodo(newTodo);
      openNotification('完成任务😊');
    } catch (err) {
      openNotification('发生错误😥');
    }
  };

  const onEditPress = () => {
    triggerModal({
      id,
      status,
      title,
      deadline
    });
  };

  const onDeletePress = () => {
    try {
      deleteTodo(id);
      openNotification('删除成功');
    } catch (err) {
      openNotification('发生错误😥');
    }
  };

  return (
    <div className='todo-item'>
      <div className='inner'>
        <div className='todo-item-content todo-left'>
          <div className={`dot ${status}-bg`} />
          <div className='todo-title'>{title}</div>
        </div>
        <div className='todo-right'>
          <span className='todo-deadline'>{moment.unix(deadline).format('L')}</span>
          <div className='todo-options'>
            {
              status !== 'finished' &&
                <React.Fragment>
                  <button onClick={onDonePress}>
                    <i className='material-icons done'>done</i>
                  </button>
                  <button onClick={onEditPress}>
                    <i className='material-icons edit'>mode_edit</i>
                  </button>
                </React.Fragment>
            }
            <button onClick={onDeletePress}>
              <i className='material-icons delete'>delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTodo: (todo) => dispatch(editTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    openNotification: (message) => dispatch(openNotification(message)),
    triggerModal: (todo) => dispatch(triggerModal(todo))
  };
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deadline: PropTypes.number.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  openNotification: PropTypes.func.isRequired,
  triggerModal: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(TodoItem);

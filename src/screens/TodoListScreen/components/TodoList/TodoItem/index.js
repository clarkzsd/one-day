import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

const TodoItem = ({
  data,
  onEdit,
  onFinish,
  onDelete
}) => {
  const handleFinish = () => {
    const newTodo = {
      id: data.id,
      status: 'finished',
      title: data.title,
      deadline: data.deadline,
      finishedAt: moment().unix()
    };
    onFinish(newTodo);
  };

  const handleEdit = () => {
    onEdit({
      id: data.id,
      status: data.status,
      title: data.title,
      deadline: data.deadline
    });
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className='todo-item'>
      <div className='inner'>
        <div className='todo-item-content todo-left'>
          <div className={`dot ${data.status}-bg`} />
          <div className='todo-title'>{data.title}</div>
        </div>
        <div className='todo-right'>
          <span className='todo-deadline'>{moment.unix(data.deadline).format('L')}</span>
          <div className='todo-options'>
            {
              status !== 'finished' &&
                <React.Fragment>
                  <button onClick={handleFinish}>
                    <i className='material-icons done'>done</i>
                  </button>
                  <button onClick={handleEdit}>
                    <i className='material-icons edit'>mode_edit</i>
                  </button>
                </React.Fragment>
            }
            <button onClick={handleDelete}>
              <i className='material-icons delete'>delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoItem;

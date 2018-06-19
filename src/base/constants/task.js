const TASK_STATUS_READY = 0;
const TASK_STATUS_TODO = 1;
const TASK_STATUS_ARCHIVE = 2;

const taskStatus = {
  [TASK_STATUS_READY]: 'ready',
  [TASK_STATUS_TODO]: 'todo',
  [TASK_STATUS_ARCHIVE]: 'archive'
};

const taskStatusList = [
  'ready',
  'todo',
  'archive'
];

export {
  taskStatus,
  taskStatusList
};
